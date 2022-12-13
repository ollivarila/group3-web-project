import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './styles/Notification.css'

const Notification = () => {
  const { message, type } = useSelector((state) => state.notification)

  if (!message) {
    return null
  }

  const style = {
    borderColor: `var(--${type})`,
    color: `var(--${type})`,
  }

  return (
    <div className="notification" style={style}>
      <h3 className="notification-message" style={style}>
        {message}
      </h3>
    </div>
  )
}

export default Notification
