// src/services/api.js
// All backend API calls live here — import this in any page instead of localStorage

const BASE = 'http://localhost:5000/api'

// Helper — get JWT token from localStorage
const token = () => localStorage.getItem('token')

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token()}`
})

// ── AUTH ─────────────────────────────────────────────────────

export const signup = (name, email, password) =>
  fetch(`${BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',   // send/receive cookies
  }).then(r => r.json())

export const login = (email, password) =>
  fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  }).then(r => r.json())

export const logout = () =>
  fetch(`${BASE}/auth/logout`, {
    method: 'POST',
    headers: headers(),
    credentials: 'include',
  }).then(r => r.json())

export const getMe = () =>
  fetch(`${BASE}/auth/me`, { headers: headers(), credentials: 'include' })
    .then(r => r.json())

export const updateProfile = (data) =>
  fetch(`${BASE}/auth/profile`, {
    method: 'PUT',
    headers: headers(),
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(r => r.json())

export const changePassword = (currentPassword, newPassword) =>
  fetch(`${BASE}/auth/password`, {
    method: 'PUT',
    headers: headers(),
    credentials: 'include',
    body: JSON.stringify({ currentPassword, newPassword }),
  }).then(r => r.json())

// ── REPORTS ──────────────────────────────────────────────────

export const getAllReports = () =>
  fetch(`${BASE}/reports`, { credentials: 'include' })
    .then(r => r.json())

export const getMyReports = () =>
  fetch(`${BASE}/reports/mine`, { headers: headers(), credentials: 'include' })
    .then(r => r.json())

export const createReport = (data) =>
  fetch(`${BASE}/reports`, {
    method: 'POST',
    headers: headers(),
    credentials: 'include',
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteReport = (id) =>
  fetch(`${BASE}/reports/${id}`, {
    method: 'DELETE',
    headers: headers(),
    credentials: 'include',
  }).then(r => r.json())
