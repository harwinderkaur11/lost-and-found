const LoadingSpinner = ({ visible }) => {
  if (!visible) return null
  return (
    <div className="spinner-overlay">
      <div className="gradient-spinner" />
      <p className="loading-text">Loading Dashboard...</p>
    </div>
  )
}
export default LoadingSpinner
