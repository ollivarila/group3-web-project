import React from 'react'
import './styles/sidebarstyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrent } from '../reducers/currentShoppingListReducer'

const Sidebar = ({ handleShowListAdding }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const shoppingLists = useSelector((state) => state.shoppingLists)

  const handleButtonSelected = (shoppingList) => {
    dispatch(setCurrent(shoppingList))
  }

  return (
    <section className="sidebar">
      <div className="buttonWrapper">
        <button className="addbutton" onClick={handleShowListAdding}>
          + Add a new list
        </button>
      </div>
      <h3>{user.username}'s Lists</h3>
      <div className="list">
        {shoppingLists.map((list, index) => {
          return (
            <div key={index} className="buttonWrapper">
              <button
                className="listItem"
                onClick={() => handleButtonSelected(list)}>
                {list.title}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default Sidebar
