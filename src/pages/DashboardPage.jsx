import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import AnimatedBackground from '../components/AnimatedBackground.jsx'

export default function DashboardPage({ navigate, profileImg }) {
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState([])

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    // Load real reports from localStorage
    const saved = JSON.parse(localStorage.getItem('userReports') || '[]')
    setReports(saved)
    return () => clearTimeout(t)
  }, [])

  const lostCount  = reports.filter(r => r.type === 'lost').length
  const foundCount = reports.filter(r => r.type === 'found').length
  const recentActivity = reports.slice(0, 3)  // 3 most recently submitted

  return (
    <>
      <LoadingSpinner visible={loading} />
      <AnimatedBackground />
      <div className="dashboard-container">
        <Sidebar activePage="dashboard" navigate={navigate} profileImg={profileImg} />
        <main className="main-content animate__animated animate__fadeIn">

          <header className="dashboard-header">
            <h1><i className="fas fa-tachometer-alt" /> Lost &amp; Found</h1>
          </header>

          <section className="stats-grid">
            <div className="stat-card animate__animated animate__fadeInUp" onClick={() => navigate('listings-lost')}>
              <div className="stat-icon" style={{ backgroundColor: '#1e40af' }}><i className="fas fa-question-circle" /></div>
              <div className="stat-info"><h3>{lostCount}</h3><p>Active Lost Reports</p></div>
              <div className="stat-bg-icon"><i className="fas fa-question-circle" /></div>
            </div>
            <div className="stat-card animate__animated animate__fadeInUp" onClick={() => navigate('listings-found')}>
              <div className="stat-icon" style={{ backgroundColor: '#1cc88a' }}><i className="fas fa-check-circle" /></div>
              <div className="stat-info"><h3>{foundCount}</h3><p>Found Items Reported</p></div>
              <div className="stat-bg-icon"><i className="fas fa-check-circle" /></div>
            </div>
            <div className="stat-card animate__animated animate__fadeInUp">
              <div className="stat-icon" style={{ backgroundColor: '#f6c23e' }}><i className="fas fa-exchange-alt" /></div>
              <div className="stat-info"><h3>{reports.length}</h3><p>Total Reports</p></div>
              <div className="stat-bg-icon"><i className="fas fa-exchange-alt" /></div>
            </div>
          </section>

          <section className="activity-section">
            <div className="section-header">
              <h2><i className="fas fa-history" /> Recent Activity</h2>
              <a href="#" className="view-all" onClick={e => { e.preventDefault(); navigate('report') }}>View All</a>
            </div>
            <div className="activity-timeline">
              {recentActivity.length === 0 ? (
                <p style={{ color: '#999', padding: '10px 0' }}>
                  No reports yet.{' '}
                  <a href="#" style={{ color: '#4e73df' }} onClick={e => { e.preventDefault(); navigate('report') }}>
                    Report an item
                  </a>
                </p>
              ) : (
                recentActivity.map(r => (
                  <div key={r.id} className="timeline-item animate__animated animate__fadeInRight">
                    <div className={`timeline-icon ${r.type === 'lost' ? 'primary' : 'success'}`}>
                      <i className={`fas ${r.type === 'lost' ? 'fa-question' : 'fa-check'}`} />
                    </div>
                    <div className="timeline-content">
                      <h4>{r.type === 'lost' ? '❓' : '✅'} {r.title}</h4>
                      <p>📍 {r.location} {r.category ? `• 🏷️ ${r.category}` : ''}</p>
                      <span className="timeline-time"><i className="far fa-clock" /> {r.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </main>
      </div>
    </>
  )
}