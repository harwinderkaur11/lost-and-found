import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import Modal from '../components/Modal.jsx'
import { foundItems } from '../data/data.js'

export default function FoundItemsPage({ navigate, profileImg }) {
  const [modal, setModal] = useState(null)
  return (
    <div className="dashboard-container">
      <Sidebar activePage="listings-found" navigate={navigate} profileImg={profileImg} />
      <main className="main-content">
        <header className="dashboard-header">
          <h1><i className="fas fa-check-circle" /> Recently Found Items</h1>
        </header>
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
      </main>
      {modal && <Modal item={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
