import { navLinks } from '../data/data.js'

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80'

const Sidebar = ({ activePage, navigate, profileImg }) => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) navigate('logout')
  }

  // Read logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}')

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img
          className="profile-img"
          src={profileImg || DEFAULT_AVATAR}
          alt="Profile"
          onClick={() => navigate('userprofile')}
          title="View Profile"
        />
        <h3>{user.name || 'Guest'}</h3>
        <p>{user.email || ''}</p>
      </div>

  

      <nav className="sidebar-nav">
        <ul>
          {navLinks.map(link => (
            <li key={link.page} className={activePage === link.page ? 'active' : ''}>
              <a href="#" onClick={e => { e.preventDefault(); navigate(link.page) }}>
                <i className={`fas ${link.icon}`} />
                <span>{link.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="#" onClick={e => { e.preventDefault(); handleLogout() }}>
              <i className="fas fa-sign-out-alt" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
export default Sidebar
