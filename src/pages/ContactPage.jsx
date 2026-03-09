import { useState } from 'react'

export default function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [emailError, setEmailError] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.id]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault()
    if (!form.email.endsWith('@chitkara.edu.in')) { setEmailError(true); return }
    setEmailError(false); setSending(true)
    setTimeout(() => { alert(`Thank you ${form.name}! Message sent.`); setForm({ name: '', email: '', message: '' }); setSending(false) }, 1500)
  }

  return (
    <div className="contact-page">
      <div className="contact-left">
        <h1>Reuniting Lost Things With Their Owners</h1>
        <p>Find what's lost, or help someone else.</p>
      </div>
      <div className="contact-right">
        <button className="back-button" onClick={() => navigate('dashboard')}>← Go Back</button>
        <h2>Contact Us</h2>
        <p>Have questions or need assistance? Reach out to us!</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="@chitkara.edu.in" value={form.email} onChange={handleChange} required />
          {emailError && <span className="error-message">Please use your Chitkara University email.</span>}
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" placeholder="Type your message..." value={form.message} onChange={handleChange} required />
          <button type="submit" disabled={sending}>{sending ? 'Sending…' : 'Contact Us'}</button>
        </form>
      </div>
    </div>
  )
}
