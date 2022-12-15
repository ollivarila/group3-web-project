import React from 'react'
import { useSelector } from 'react-redux'
import '../../components/styles/defaultviewstyle.css'

const DefaultView = () => {
  const user = useSelector((state) => state.user)
  
  return (
    <div className="text">
      <h1>Welcome, {user.username}</h1>
      <p>
        <b>To add a new list</b> to your shopping lists, click &quot;+ Add a new
        list&quot;
      </p>
      <p>
        <b>To see and edit</b> your shopping lists, click on any of your
        existing lists on the left side of the page
      </p>
    </div>
  )
}
export default DefaultView
