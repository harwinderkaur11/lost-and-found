import React, { useState, useCallback } from 'react'
import IndexPage       from './pages/IndexPage.jsx'
import LoginPage       from './pages/LoginPage.jsx'
import SignupPage      from './pages/SignupPage.jsx'
import DashboardPage   from './pages/DashboardPage.jsx'
import ListingsPage    from './pages/ListingsPage.jsx'
import FoundItemsPage  from './pages/FoundItemsPage.jsx'
import ReportPage      from './pages/ReportPage.jsx'
import AboutPage       from './pages/AboutPage.jsx'
import ContactPage     from './pages/ContactPage.jsx'
import SettingsPage    from './pages/SettingsPage.jsx'
import UserProfilePage from './pages/UserProfilePage.jsx'
import LogoutPage      from './pages/LogoutPage.jsx'

export default function App() {
  const [page, setPage] = useState('index')

  // Get the logged-in user's email to use as a unique key
  const getUserKey = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
    return user.email ? `profileImg_${user.email}` : 'profileImg_guest'
  }

  // Load THIS user's profile image on first render
  const [profileImg, setProfileImgState] = useState(
    () => localStorage.getItem(getUserKey()) || null
  )

  // Save/remove photo under this user's own key
  const setProfileImg = (val) => {
    const key = getUserKey()
    if (val) localStorage.setItem(key, val)
    else localStorage.removeItem(key)
    setProfileImgState(val)
  }

  const navigate = useCallback((target) => {
    setPage(target)
    window.scrollTo(0, 0)
  }, [])

  const shared = { navigate, profileImg, setProfileImg }

  const routes = {
    index:            <IndexPage       {...shared} />,
    login:            <LoginPage       {...shared} />,
    signup:           <SignupPage      {...shared} />,
    dashboard:        <DashboardPage   {...shared} />,
    listings:         <ListingsPage    {...shared} initialFilter="all"   />,
    'listings-lost':  <ListingsPage    {...shared} initialFilter="lost"  />,
    'listings-found': <ListingsPage    {...shared} initialFilter="found" />,
    found:            <FoundItemsPage  {...shared} />,
    report:           <ReportPage      {...shared} />,
    about:            <AboutPage       {...shared} />,
    contact:          <ContactPage     {...shared} />,
    settings:         <SettingsPage    {...shared} />,
    userprofile:      <UserProfilePage {...shared} />,
    logout:           <LogoutPage      {...shared} />,
  }

  return routes[page] ?? routes.index
}