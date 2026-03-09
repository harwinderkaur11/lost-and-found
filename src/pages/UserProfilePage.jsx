import { useState, useRef } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import AnimatedBackground from '../components/AnimatedBackground.jsx'

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'

export default function UserProfilePage({ navigate, profileImg, setProfileImg }) {
  const [filterTab, setFilterTab] = useState('all')
  const fileRef = useRef()

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setProfileImg(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="dashboard-container">
      <AnimatedBackground />
      <Sidebar activePage="userprofile" navigate={navigate} profileImg={profileImg} />
      <div className="main-content animate__animated animate__fadeIn">
        <header className="dashboard-header">
          <h1><i className="fas fa-user" /> User Profile</h1>
        </header>

        <div className="profile-section">
          <div className="profile-picture">
            <img src={profileImg || DEFAULT_AVATAR} alt="Profile" />
            <input type="file" ref={fileRef} accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            <button className="upload-btn" onClick={() => fileRef.current.click()}>Change Photo</button>
            <button className="btn-remove" onClick={() => setProfileImg(null)}>Remove Photo</button>
          </div>
          <div className="profile-info">
            <h2 className="user-name">John Doe</h2>
            <p className="user-email">john.doe@chitkara.edu.in</p>
            <div className="user-stats">
              <div className="stat-card"><div className="stat-info"><h3>0</h3><p>Lost Items</p></div></div>
              <div className="stat-card"><div className="stat-info"><h3>0</h3><p>Found Items</p></div></div>
            </div>
          </div>
        </div>

        <div className="my-listings-section">
          <div className="section-header">
            <h2 className="section-title"><i className="fas fa-list" /> My Lost &amp; Found Items</h2>
            <div className="filter-controls-row">
              {[{ k: 'all', l: 'All' }, { k: 'lost', l: 'Lost' }, { k: 'found', l: 'Found' }].map(({ k, l }) => (
                <button key={k} className={`filter-btn ${filterTab === k ? 'active' : 'inactive'}`} onClick={() => setFilterTab(k)}>{l}</button>
              ))}
            </div>
          </div>
          <p className="no-results" style={{ paddingTop: '20px' }}>No items to display yet.</p>
        </div>
      </div>
    </div>
  )
}
