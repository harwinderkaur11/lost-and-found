import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'

const load = (key, fallback) => {
  try {
    const val = localStorage.getItem(key)
    return val !== null ? val : fallback
  } catch { return fallback }
}

export default function SettingsPage({ navigate, profileImg }) {

  // Load logged-in user from localStorage
  const getUser = () => JSON.parse(localStorage.getItem('loggedInUser') || '{}')

  const [username, setUsername] = useState(() => load('settings_username', getUser().name  || ''))
  const [email,    setEmail]    = useState(() => getUser().email || '')   // always from logged-in user
  const [phone,    setPhone]    = useState(() => load(`settings_phone_${getUser().email}`, ''))
  const [emailN,   setEmailN]   = useState(() => load('settings_emailN',  'true') === 'true')
  const [smsN,     setSmsN]     = useState(() => load('settings_smsN',    'true') === 'true')
  const [pushN,    setPushN]    = useState(() => load('settings_pushN',   'false') === 'true')
  const [freq,     setFreq]     = useState(() => load('settings_freq',    'Daily Digest'))
  const [curPass,  setCurPass]  = useState('')
  const [newPass,  setNewPass]  = useState('')
  const [conPass,  setConPass]  = useState('')

  const saveProfile = () => {
    const user = getUser()
    localStorage.setItem('settings_username', username)
    localStorage.setItem(`settings_phone_${user.email}`, phone)

    // Update the name in loggedInUser and in users array too
    const updatedUser = { ...user, name: username }
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map(u => u.email === user.email ? { ...u, name: username } : u)
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    alert('Profile saved!')
  }

  const saveNotifications = () => {
    localStorage.setItem('settings_emailN', String(emailN))
    localStorage.setItem('settings_smsN',   String(smsN))
    localStorage.setItem('settings_pushN',  String(pushN))
    localStorage.setItem('settings_freq',   freq)
    alert('Preferences updated!')
  }

  const changePassword = () => {
    if (!curPass) return alert('Please enter your current password!')
    const user = getUser()

    // Check current password matches
    if (curPass !== user.password) return alert('Current password is incorrect!')
    if (newPass.length < 8)        return alert('New password must be at least 8 characters!')
    if (newPass !== conPass)        return alert('Passwords do not match!')

    // Update password in loggedInUser and users array
    const updatedUser = { ...user, password: newPass }
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser))

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const updatedUsers = users.map(u => u.email === user.email ? { ...u, password: newPass } : u)
    localStorage.setItem('users', JSON.stringify(updatedUsers))

    alert('Password changed successfully!')
    setCurPass(''); setNewPass(''); setConPass('')
  }

  const downloadData = () => {
    const user = getUser()
    const reports = JSON.parse(localStorage.getItem('userReports') || '[]')

    // Build a JSON file with all user data
    const data = {
      profile: {
        name:  username,
        email: user.email,
        phone,
      },
      preferences: { emailNotifications: emailN, smsNotifications: smsN, pushNotifications: pushN, frequency: freq },
      reports,
    }

    // Trigger download as a .json file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `my-data-${user.email}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="dashboard-container">
      <Sidebar activePage="settings" navigate={navigate} profileImg={profileImg} />
      <main className="main-content">
        <div className="page-header"><h1 className="page-title">Account Settings</h1></div>
        <div className="settings-grid">

          {/* Profile */}
          <section className="settings-card">
            <div className="card-header"><h2 className="card-title">Profile Information</h2><i className="fas fa-user-edit card-icon" /></div>
            <label className="form-label">Full Name</label>
            <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" value={email} disabled style={{ background: '#f5f5f5', cursor: 'not-allowed' }} />
            <p className="form-note">Email cannot be changed</p>
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)} />
            <div className="btn-group">
              <button className="btn btn-primary" onClick={saveProfile}><i className="fas fa-save" /> Save Changes</button>
              <button className="btn btn-outline" onClick={() => { setUsername(getUser().name || ''); setPhone(load(`settings_phone_${getUser().email}`, '')) }}>Cancel</button>
            </div>
          </section>

          {/* Notifications */}
          <section className="settings-card">
            <div className="card-header"><h2 className="card-title">Notification Preferences</h2><i className="fas fa-bell card-icon" /></div>
            {[
              ['email-n', 'Email notifications', emailN, setEmailN],
              ['sms-n',   'SMS notifications',   smsN,   setSmsN],
              ['push-n',  'Push notifications',  pushN,  setPushN],
            ].map(([id, label, val, setter]) => (
              <div key={id} className="checkbox-group">
                <input type="checkbox" id={id} checked={val} onChange={e => setter(e.target.checked)} />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
            <div className="divider" />
            <label className="form-label">Frequency</label>
            <select className="form-control" value={freq} onChange={e => setFreq(e.target.value)}>
              <option>Immediately</option><option>Daily Digest</option><option>Weekly Summary</option>
            </select>
            <div className="btn-group">
              <button className="btn btn-primary" onClick={saveNotifications}><i className="fas fa-sync-alt" /> Update</button>
            </div>
          </section>

          {/* Security */}
          <section className="settings-card">
            <div className="card-header"><h2 className="card-title">Security Settings</h2><i className="fas fa-shield-alt card-icon" /></div>
            <div className="security-badge"><i className="fas fa-check-circle" /> Your account security is strong</div>
            <label className="form-label">Current Password</label>
            <input type="password" className="form-control" placeholder="Enter current password" value={curPass} onChange={e => setCurPass(e.target.value)} />
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" placeholder="Min 8 characters" value={newPass} onChange={e => setNewPass(e.target.value)} />
            <label className="form-label">Confirm New Password</label>
            <input type="password" className="form-control" placeholder="Confirm new password" value={conPass} onChange={e => setConPass(e.target.value)} />
            <div className="btn-group">
              <button className="btn btn-primary" onClick={changePassword}><i className="fas fa-key" /> Change Password</button>
            </div>
          </section>

          {/* Account Actions */}
          <section className="settings-card">
            <div className="card-header"><h2 className="card-title">Account Actions</h2><i className="fas fa-exclamation-triangle card-icon" /></div>
            <label className="form-label">Download Your Data</label>
            <p className="form-note">Downloads a JSON file with your profile, preferences and reports.</p>
            <button className="btn btn-outline full-width" onClick={downloadData}><i className="fas fa-download" /> Request Data Download</button>
            <div className="divider" />
            <label className="form-label">Delete Account</label>
            <p className="form-note">This action cannot be undone.</p>
            <button
              className="btn btn-outline full-width delete-btn"
              onClick={() => {
                if (window.confirm('Are you sure? This cannot be undone.')) {
                  localStorage.clear()
                  navigate('index')
                }
              }}
            >
              <i className="fas fa-trash-alt" /> Delete My Account
            </button>
          </section>

        </div>
      </main>
    </div>
  )
}