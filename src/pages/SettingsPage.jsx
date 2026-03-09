import { useState } from 'react'
import Sidebar from '../components/Sidebar.jsx'

export default function SettingsPage({ navigate, profileImg }) {
  const [username, setUsername] = useState('johndoe')
  const [email,    setEmail]    = useState('john.doe@example.com')
  const [phone,    setPhone]    = useState('+1 (555) 123-4567')
  const [emailN,   setEmailN]   = useState(true)
  const [smsN,     setSmsN]     = useState(true)
  const [pushN,    setPushN]    = useState(false)
  const [freq,     setFreq]     = useState('Daily Digest')
  const [curPass,  setCurPass]  = useState('')
  const [newPass,  setNewPass]  = useState('')
  const [conPass,  setConPass]  = useState('')

  return (
    <div className="dashboard-container">
      <Sidebar activePage="settings" navigate={navigate} profileImg={profileImg} />
      <main className="main-content">
        <div className="page-header"><h1 className="page-title">Account Settings</h1></div>
        <div className="settings-grid">

          {/* Profile */}
          <section className="settings-card">
            <div className="card-header"><h2 className="card-title">Profile Information</h2><i className="fas fa-user-edit card-icon" /></div>
            <label className="form-label">Username</label>
            <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
            <label className="form-label">Email Address</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            <p className="form-note">This is the email associated with your account</p>
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
            <div className="btn-group">
              <button className="btn btn-primary" onClick={() => alert('Saved!')}><i className="fas fa-save" /> Save Changes</button>
              <button className="btn btn-outline">Cancel</button>
            </div>
          </section>

          {/* Notifications */}
          <section className="settings-card">
            <div className="card-header"><h2 className="card-title">Notification Preferences</h2><i className="fas fa-bell card-icon" /></div>
            {[['email-n', 'Email notifications', emailN, setEmailN], ['sms-n', 'SMS notifications', smsN, setSmsN], ['push-n', 'Push notifications', pushN, setPushN]].map(([id, label, val, setter]) => (
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
              <button className="btn btn-primary" onClick={() => alert('Updated!')}><i className="fas fa-sync-alt" /> Update</button>
            </div>
          </section>

          {/* Security */}
          <section className="settings-card">
            <div className="card-header"><h2 className="card-title">Security Settings</h2><i className="fas fa-shield-alt card-icon" /></div>
            <div className="security-badge"><i className="fas fa-check-circle" /> Your account security is strong</div>
            <label className="form-label">Current Password</label>
            <input type="password" className="form-control" placeholder="Enter current password" value={curPass} onChange={e => setCurPass(e.target.value)} />
            <label className="form-label">New Password</label>
            <input type="password" className="form-control" placeholder="New password (min 8 chars)" value={newPass} onChange={e => setNewPass(e.target.value)} />
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" placeholder="Confirm new password" value={conPass} onChange={e => setConPass(e.target.value)} />
            <div className="btn-group">
              <button className="btn btn-primary" onClick={() => { if (newPass.length < 8) return alert('Too short!'); if (newPass !== conPass) return alert('No match!'); alert('Password changed!') }}>
                <i className="fas fa-key" /> Change Password
              </button>
            </div>
          </section>

          {/* Account Actions */}
          <section className="settings-card">
            <div className="card-header"><h2 className="card-title">Account Actions</h2><i className="fas fa-exclamation-triangle card-icon" /></div>
            <label className="form-label">Download Your Data</label>
            <p className="form-note">Request a copy of all your personal data.</p>
            <button className="btn btn-outline full-width" onClick={() => alert('Download requested!')}><i className="fas fa-download" /> Request Data Download</button>
            <div className="divider" />
            <label className="form-label">Delete Account</label>
            <p className="form-note">This action cannot be undone.</p>
            <button className="btn btn-outline full-width delete-btn" onClick={() => { if (window.confirm('Sure?')) { alert('Deleted.'); navigate('index') } }}>
              <i className="fas fa-trash-alt" /> Delete My Account
            </button>
          </section>
        </div>
      </main>
    </div>
  )
}
