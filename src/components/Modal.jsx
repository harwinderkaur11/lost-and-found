const Modal = ({ item, onClose }) => {
  if (!item) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {item.img && <img src={item.img} alt={item.title} onError={e => e.target.src = 'https://via.placeholder.com/400x250?text=No+Image'} />}
        <h3>{item.title}</h3>
        <p>📍 Location: {item.location}</p>
        <p>{item.desc}</p>
        {item.date     && <p>📅 Date: {item.date}</p>}
        {item.category && <p>🏷️ Category: {item.category}</p>}
      </div>
    </div>
  )
}
export default Modal
