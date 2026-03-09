import { useState, useEffect } from 'react'

export default function LogoutPage({ navigate }) {
  const [count, setCount] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => {
        if (c <= 1) { clearInterval(interval); navigate('index'); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="logout-page">
      <div className="logout-container">
        <svg className="logout-logo" viewBox="0 0 24 24" fill="none">
          <path d="M19 21H5C3.895 21 3 20.105 3 19V5C3 3.895 3.895 3 5 3H19C20.105 3 21 3.895 21 5V19C21 20.105 20.105 21 19 21Z" stroke="#4361ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 8L8 16" stroke="#7209b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8L16 16" stroke="#7209b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h1>You've Been Logged Out</h1>
        <p className="message">Your session has ended securely. We hope to see you back soon!</p>
        <p className="quote">"Every new beginning comes from some other beginning's end."</p>
        <p className="logout-countdown">Redirecting in <span>{count}</span> second{count !== 1 ? 's' : ''}…</p>
      </div>
    </div>
  )
}
