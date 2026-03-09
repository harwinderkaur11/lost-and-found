import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Modal from '../components/Modal.jsx'
import { foundItems, reportedItems } from '../data/data.js'

const EMPTY = { name: '', location: '', item: '', option: '', date: '', description: '' }

export default function ReportPage({ navigate, profileImg }) {
  const [tab,   setTab]  = useState('found')
  const [modal, setModal] = useState(null)
  const [form,  setForm]  = useState(EMPTY)

  const handleChange = e => setForm({ ...form, [e.target.id]: e.target.value })
  const handleSubmit = e => { e.preventDefault(); alert('Report submitted!'); setForm(EMPTY) }

  return (
    <div className="dashboard-container">
      <Sidebar activePage="report" navigate={navigate} profileImg={profileImg} />
      <main className="main-content">
        <header className="dashboard-header"><div>🔍 Lost&amp;Found!</div></header>

        <div className="toggle-btns">
          {[['found', 'Found Items'], ['report', 'Report Lost Item'], ['view', 'View Report']].map(([k, l]) => (
            <button key={k} className={`toggle-btn ${tab === k ? 'active-tab' : ''}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>

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

        {tab === 'report' && (
          <div className="report-section">
            <h2>Report Lost Item</h2>
            <form className="report-form" onSubmit={handleSubmit}>
              <input type="text" id="name"        placeholder="Your Name"          value={form.name}        onChange={handleChange} required />
              <input type="text" id="location"    placeholder="Last Seen Location" value={form.location}    onChange={handleChange} required />
              <input type="text" id="item"        placeholder="Item Name"          value={form.item}        onChange={handleChange} required />
              <select id="option" value={form.option} onChange={handleChange} required>
                <option value="">Select Category</option>
                {['Phone', 'Wallet', 'Keys', 'ID Card', 'Watch', 'Charger'].map(o => (
                  <option key={o} value={o.toLowerCase()}>{o}</option>
                ))}
              </select>
              <input type="date" id="date" value={form.date} onChange={handleChange} required />
              <textarea id="description" rows="4" placeholder="Describe the item" value={form.description} onChange={handleChange} required />
              <button type="submit">Submit Report</button>
            </form>
          </div>
        )}

        {tab === 'view' && (
          <div className="report-section">
            <h2>View Reported Lost Items</h2>
            <div className="report-list">
              {reportedItems.map(item => (
                <div key={item.id} className="report-card" onClick={() => setModal(item)}>
                  <h3>{item.title}</h3>
                  <p>📍 {item.location}</p>
                  <p>🏷️ {item.category}</p>
                  <p>{item.desc}</p>
                  <p>📅 {item.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      {modal && <Modal item={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
