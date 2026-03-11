const IndexPage = ({ navigate }) => (
  <div className="landing-page">
    <header className="landing-header">
      <h1>Lost &amp; Found</h1>
      <p>Your trusted platform to reunite people with their belongings.</p>
      <nav>
        <ul>
          <li><a href="#report-lost">Report Lost</a></li>
          <li><a href="#report-found">Report Found</a></li>
          <li><a href="#browse-items">Browse Items</a></li>
        </ul>
      </nav>
    </header>

    <section className="landing-hero">
      <h2>Lost something? Found something 🔍</h2>
      <p>Help us connect people with what they've lost. Together, we make finding easier.</p>
      <button onClick={() => navigate('login')}>Get Started</button>
    </section>

    <section className="landing-how">
      <h2>How it Works?</h2>
      <div className="landing-steps">
        {[
          ['1. Report',  'Submit a lost or found report in just a few clicks.'],
          ['2. Match',   'We automatically match lost and found items using keywords and filters.'],
          ['3. Reunite', 'Communicate securely and reunite with your belongings.'],
        ].map(([title, desc]) => (
          <div key={title} className="landing-step">
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </section>

    <footer className="landing-footer">
      <p>&copy; 2026 Lost &amp; Found. All rights reserved.</p>
    </footer>
  </div>
)
export default IndexPage
