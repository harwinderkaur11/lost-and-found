import { useState } from 'react'

export default function SignupPage({ navigate }) {
  const [name,       setName]       = useState('')
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [showPass,   setShowPass]   = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passError,  setPassError]  = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    let valid = true
    if (!email.endsWith('@chitkara.edu.in')) { setEmailError(true);  valid = false } else setEmailError(false)
    if (password.length < 8)                 { setPassError(true);   valid = false } else setPassError(false)
    if (!valid) return

    // Check if email already registered
    const existing = JSON.parse(localStorage.getItem('users') || '[]')
    if (existing.find(u => u.email === email)) {
      alert('An account with this email already exists!')
      return
    }

    // Save new user to localStorage
    const newUser = { name, email, password }
    localStorage.setItem('users', JSON.stringify([...existing, newUser]))

    alert('Account created! Please login.')
    navigate('login')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-left-text">Reuniting Lost Things<br />With Their Owners 💙</div>
        </div>
        <div className="auth-right">
          <div className="auth-form-box">
            <h2>Hello Friend! 👋</h2>
            <p>Find what's lost, or help someone else.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="@chitkara.edu.in" value={email} onChange={e => setEmail(e.target.value)} required />
                <span className={`error-message ${emailError ? '' : 'hidden'}`}>
                  Please use your Chitkara University email (@chitkara.edu.in)
                </span>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" className="password-toggle-btn" onClick={() => setShowPass(!showPass)}>
                    <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </button>
                </div>
                <span className={`error-message ${passError ? '' : 'hidden'}`}>Password must be at least 8 characters</span>
              </div>
              <button type="submit" className="auth-submit-btn">Sign Up</button>
            </form>
            <div className="auth-footer">
              Already have an account?{' '}
              <a href="#" onClick={e => { e.preventDefault(); navigate('login') }}>Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
