import { useState } from 'react'

export default function LoginPage({ navigate }) {
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [showPass,   setShowPass]   = useState(false)
  const [emailError, setEmailError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (!email.endsWith('@chitkara.edu.in')) { setEmailError(true); return }
    setEmailError(false)
    navigate('dashboard')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-left-text">Reuniting Lost Things<br />With Their Owners 💙</div>
        </div>
        <div className="auth-right">
          <div className="auth-form-box">
            <h2>Welcome Back</h2>
            <p>Find what's lost, or help someone else.</p>
            <form onSubmit={handleSubmit}>
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
                  <input type={showPass ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" className="password-toggle-btn" onClick={() => setShowPass(!showPass)}>
                    <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </button>
                </div>
              </div>
              <button type="submit" className="auth-submit-btn">Login</button>
            </form>
            <div className="auth-footer">
              Don't have an account?{' '}
              <a href="#" onClick={e => { e.preventDefault(); navigate('signup') }}>Sign up</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
