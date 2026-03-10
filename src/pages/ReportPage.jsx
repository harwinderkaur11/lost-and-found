import { useState, useRef } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Modal from '../components/Modal.jsx'
import { foundItems, reportedItems as defaultReported } from '../data/data.js'

const EMPTY = { name: '', location: '', item: '', option: '', date: '', description: '', type: 'lost', img: '' }

const loadReports = () => {
  try {
    const saved = localStorage.getItem('userReports')
    return saved ? JSON.parse(saved) : defaultReported
  } catch { return defaultReported }
}

export default function ReportPage({ navigate, profileImg }) {
  const [tab,      setTab]     = useState('found')
  const [modal,    setModal]   = useState(null)
  const [form,     setForm]    = useState(EMPTY)
  const [reports,  setReports] = useState(loadReports)
  const [preview,  setPreview] = useState(null)   // image preview before submit
  const fileRef = useRef()

  const handleChange = e => setForm({ ...form, [e.target.id]: e.target.value })

  // Convert selected image to base64 and store in form
  const handleImageChange = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm(f => ({ ...f, img: reader.result }))
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setForm(f => ({ ...f, img: '' }))
    setPreview(null)
    fileRef.current.value = ''
  }

  const handleSubmit = e => {
    e.preventDefault()
    const newReport = {
      id:       Date.now(),
      title:    form.item,
      location: form.location,
      category: form.option,
      desc:     form.description,
      date:     form.date,
      name:     form.name,
      type:     form.type,
      img:      form.img,   // base64 image saved to localStorage
    }
    const updated = [newReport, ...reports]
    setReports(updated)
    localStorage.setItem('userReports', JSON.stringify(updated))
    alert('Report submitted and saved!')
    setForm(EMPTY)
    setPreview(null)
    setTab('view')
  }

  return (
    <div className="dashboard-container">
      <Sidebar activePage="report" navigate={navigate} profileImg={profileImg} />
      <main className="main-content">
        <header className="dashboard-header"><div>🔍 Lost&amp;Found!</div></header>

        <div className="toggle-btns">
          {[['found', 'Found Items'], ['report', 'Report Item'], ['view', 'View Reports']].map(([k, l]) => (
            <button key={k} className={'toggle-btn ' + (tab === k ? 'active-tab' : '')} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>

        {/* Tab 1 — Found Items */}
        {tab === 'found' && (
          <div className="report-section">
            <h2>Recently Found Items</h2>
            <div className="found-list">
              {foundItems.map(item => (
                <div key={item.id} className="found-card" onClick={() => setModal(item)}>
                  <img src={item.img} alt={item.title} onError={e => e.target.src = 'https://via.placeholder.com/260x180'} />
                  <h3>{item.title}</h3>
                  <p>📍 {item.location}</p>
                  <p className="click-hint">Click to see details</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2 — Report Form */}
        {tab === 'report' && (
          <div className="report-section">
            <h2>Report an Item</h2>
            <form className="report-form" onSubmit={handleSubmit}>
              <input type="text" id="name"     placeholder="Your Name"          value={form.name}     onChange={handleChange} required />
              <input type="text" id="location" placeholder="Last Seen Location" value={form.location} onChange={handleChange} required />
              <input type="text" id="item"     placeholder="Item Name"          value={form.item}     onChange={handleChange} required />

              <select id="type" value={form.type} onChange={handleChange} required>
                <option value="lost">Lost Item</option>
                <option value="found">Found Item</option>
              </select>

              <select id="option" value={form.option} onChange={handleChange} required>
                <option value="">Select Category</option>
                {['Phone', 'Wallet', 'Keys', 'ID Card', 'Watch', 'Charger'].map(o => (
                  <option key={o} value={o.toLowerCase()}>{o}</option>
                ))}
              </select>

              <input type="date" id="date" value={form.date} onChange={handleChange} required />
              <textarea id="description" rows="4" placeholder="Describe the item" value={form.description} onChange={handleChange} required />

              {/* ── Image Upload ── */}
              <div style={{ margin: '8px 0' }}>
                <input
                  type="file"
                  ref={fileRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px dashed #4e73df', background: '#f0f4ff', color: '#4e73df', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}
                >
                  📷 {preview ? 'Change Photo' : 'Add Photo (optional)'}
                </button>

                {/* Image Preview */}
                {preview && (
                  <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block', width: '100%' }}>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ddd' }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      style={{ position: 'absolute', top: '8px', right: '8px', background: 'red', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', lineHeight: '1' }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              <button type="submit">Submit Report</button>
            </form>
          </div>
        )}

        {/* Tab 3 — View Reports */}
        {tab === 'view' && (
          <div className="report-section">
            <h2>View Reports</h2>
            {reports.length === 0 ? (
              <p style={{ color: '#999', marginTop: '20px' }}>No reports yet. Submit one first!</p>
            ) : (
              <div className="report-list">
                {reports.map(item => (
                  <div key={item.id} className="report-card" onClick={() => setModal(item)}>
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                        onError={e => e.target.style.display = 'none'}
                      />
                    )}
                    <h3>{item.type === 'lost' ? '❓' : '✅'} {item.title}</h3>
                    <p>📍 {item.location}</p>
                    {item.category && <p>🏷️ {item.category}</p>}
                    <p>{item.desc}</p>
                    <p>📅 {item.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      {modal && <Modal item={modal} onClose={() => setModal(null)} />}
    </div>
  )
}