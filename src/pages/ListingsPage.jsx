import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Modal from '../components/Modal.jsx'
import { listingsData } from '../data/data.js'

export default function ListingsPage({ navigate, profileImg, initialFilter = 'all' }) {
  const [filter, setFilter] = useState(initialFilter)
  const [search, setSearch] = useState('')
  const [sort,   setSort]   = useState('date-desc')
  const [modal,  setModal]  = useState(null)

  const filtered = listingsData
    .filter(i => filter === 'all' || i.type === filter)
    .filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.desc.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'date-desc')  return new Date(b.date) - new Date(a.date)
      if (sort === 'date-asc')   return new Date(a.date) - new Date(b.date)
      if (sort === 'title-asc')  return a.title.localeCompare(b.title)
      if (sort === 'title-desc') return b.title.localeCompare(a.title)
      return 0
    })

  const activeNav = filter === 'all' ? 'listings' : `listings-${filter}`

  return (
    <div className="dashboard-container">
      <Sidebar activePage={activeNav} navigate={navigate} profileImg={profileImg} />
      <main className="main-content">
        <header className="dashboard-header">
          <h1 className="page-title"><i className="fas fa-list" /> Listings</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)} />
            <button><i className="fas fa-search" /></button>
          </div>
        </header>

        <div className="filter-controls">
          {[{ k: 'all', l: 'All Items' }, { k: 'lost', l: 'Lost Items' }, { k: 'found', l: 'Found Items' }].map(({ k, l }) => (
            <button key={k} className={`filter-btn ${filter === k ? 'active' : 'inactive'}`} onClick={() => setFilter(k)}>{l}</button>
          ))}
          <div className="sort-dropdown">
            <label>Sort by:</label>
            <select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="title-asc">Title (A–Z)</option>
              <option value="title-desc">Title (Z–A)</option>
            </select>
          </div>
        </div>

        <div className="listings-grid">
          {filtered.length === 0 && <p className="no-results">No items found.</p>}
          {filtered.map(item => (
            <div key={item.id} className="listing-card" onClick={() => setModal(item)}>
              <img src={item.img} alt={item.title} className="listing-card-img" onError={e => e.target.src = 'https://via.placeholder.com/280x180'} />
              <div className="listing-card-body">
                <span className={`listing-type-badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                  {item.type === 'lost' ? '❓ Lost' : '✅ Found'}
                </span>
                <div className="listing-card-title">{item.title}</div>
                <div className="listing-card-meta"><i className="fas fa-map-marker-alt" /> {item.location}</div>
                <div className="listing-card-meta"><i className="fas fa-calendar" /> {item.date}</div>
                <span className="listing-card-btn">View Details</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      {modal && <Modal item={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
