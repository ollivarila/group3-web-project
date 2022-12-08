import React from 'react'

const FailNotification = ({ message }) => {
  const style = {
    color: 'var(--error)',
    fontSize: '14px',
  }
  return (
    <p style={style}>{message}</p>
  )
}

export default FailNotification;
