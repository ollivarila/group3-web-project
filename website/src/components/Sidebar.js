import React from 'react'
import './styles/sidebarstyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrent } from '../reducers/currentShoppingListReducer'

const Sidebar = ({ handleShowListAdding, handleListClick }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const shoppingLists = useSelector((state) => state.shoppingLists)

  const handleButtonSelected = (shoppingList) => {
    dispatch(setCurrent(shoppingList))
    handleListClick()
  }

  return (
    <section className="sidebar">
      <div className="buttonWrapper">
        <button className="addbutton" onClick={handleShowListAdding}>
          + Add a new list
        </button>
      </div>
      <div className="sidebarContainer">
        {user.username.charAt(user.username.length - 1) === 's' ? (
          <h2>{user.username}' Lists </h2>
        ) : (
          <h2>{user.username}'s Lists</h2>
        )}
        <div className="list">
          {shoppingLists.map((list, index) => {
            const date = new Date(list.createdAt)
            const dateStr = date.toLocaleString('fi-FI', {
              day: '2-digit',
              month: '2-digit',
            })
            console.log(dateStr)
            return (
              <div key={index} className="buttonWrapper">
                <button
                  className="listItem"
                  onClick={() => handleButtonSelected(list)}>
                  <p>{list.title}</p>
                  <p className="date">{dateStr}</p>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default Sidebar
