import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import AnimatedBackground from '../components/AnimatedBackground.jsx'

export default function DashboardPage({ navigate, profileImg }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t) }, [])

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
              <div className="stat-info"><h3>5</h3><p>Active Lost Reports</p></div>
              <div className="stat-bg-icon"><i className="fas fa-question-circle" /></div>
            </div>
            <div className="stat-card animate__animated animate__fadeInUp" onClick={() => navigate('listings-found')}>
              <div className="stat-icon" style={{ backgroundColor: '#1cc88a' }}><i className="fas fa-check-circle" /></div>
              <div className="stat-info"><h3>3</h3><p>Found Items Reported</p></div>
              <div className="stat-bg-icon"><i className="fas fa-check-circle" /></div>
            </div>
            <div className="stat-card animate__animated animate__fadeInUp">
              <div className="stat-icon" style={{ backgroundColor: '#f6c23e' }}><i className="fas fa-exchange-alt" /></div>
              <div className="stat-info"><h3>2</h3><p>Successful Returns</p></div>
              <div className="stat-bg-icon"><i className="fas fa-exchange-alt" /></div>
            </div>
          </section>

          <section className="activity-section">
            <div className="section-header">
              <h2><i className="fas fa-history" /> Recent Activity</h2>
              <a href="#" className="view-all">View All</a>
            </div>
            <div className="activity-timeline">
              {[
                { cls: 'success', icon: 'fa-check',       title: 'Wallet Returned!',      body: 'Your lost wallet has been returned by Sarah J.', time: '2 hours ago' },
                { cls: 'primary', icon: 'fa-bell',         title: 'New Match Found',        body: 'Potential match found for your lost keys report.', time: '1 day ago'  },
                { cls: 'warning', icon: 'fa-exclamation',  title: 'Report Expiring Soon',   body: 'Your lost phone report will expire in 3 days.',   time: '2 days ago' },
              ].map(({ cls, icon, title, body, time }) => (
                <div key={title} className="timeline-item animate__animated animate__fadeInRight">
                  <div className={`timeline-icon ${cls}`}><i className={`fas ${icon}`} /></div>
                  <div className="timeline-content">
                    <h4>{title}</h4>
                    <p>{body}</p>
                    <span className="timeline-time"><i className="far fa-clock" /> {time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
