import Sidebar from '../components/Sidebar.jsx'
import { teamMembers } from '../data/data.js'

export default function AboutPage({ navigate, profileImg }) {
  return (
    <div className="dashboard-container">
      <Sidebar activePage="about" navigate={navigate} profileImg={profileImg} />
      <main className="main-content">
        <header className="about-header">
          <h1 className="about-title">About Our Lost &amp; Found Platform</h1>
          <p className="about-subtitle">Connecting lost items with their owners through community power and smart technology.</p>
        </header>

        <section className="about-section animate__animated animate__fadeIn">
          <h2 className="section-title"><i className="fas fa-bullseye" /> Our Mission</h2>
          <p>We believe that losing personal items shouldn't mean losing them forever. Our platform was created to revolutionize how lost items are returned to their owners by leveraging community networks and intelligent matching algorithms.</p>
        </section>

        <section className="about-section animate__animated animate__fadeIn">
          <h2 className="section-title"><i className="fas fa-history" /> Our Story</h2>
          <p>Founded in 2023 after one of our team members lost (and fortunately found) an important family heirloom. What began as a small university project has grown into a trusted platform.</p>
          <div className="stats-container">
            {[['10,000+', 'Items Reunited'], ['50+', 'Campuses Served'], ['24h', 'Average Return Time']].map(([n, l]) => (
              <div key={l} className="stat-card-about">
                <div className="stat-number-big">{n}</div>
                <div className="stat-label-sm">{l}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section animate__animated animate__fadeIn">
          <h2 className="section-title"><i className="fas fa-users" /> Our Team</h2>
          <div className="team-grid">
            {teamMembers.map(m => (
              <article key={m.name} className="team-member">
                <div className="member-avatar">{m.initials}</div>
                <h3 className="member-name">{m.name}</h3>
                <p className="member-role">{m.role}</p>
                <div className="social-links">
                  {m.socials.map(s => {
                    const brand = ['linkedin', 'twitter', 'github', 'dribbble'].includes(s)
                    return <a key={s} href="#"><i className={`${brand ? 'fab' : 'fas'} fa-${s}`} /></a>
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
