import React from 'react'
import './styles/sidebarstyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrent } from '../reducers/currentShoppingListReducer'
import ItemForm from '../pages/Home/components/ItemForm'

const Sidebar = ({ handleShowListAdding }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const shoppingLists = useSelector((state) => state.shoppingLists)

  const handleButtonSelected = (shoppingList) => {
    dispatch(setCurrent(shoppingList))
    return  <ItemForm />
  }

  return (
    <section className="sidebar">
      <div className="buttonWrapper">
        <button className="addbutton" onClick={handleShowListAdding}>
          + Add a new list
        </button>
      </div>
      {user.username.charAt(user.username.length-1)==='s' 
      ? <h2>{user.username}' Lists </h2>
      : <h2>{user.username}'s Lists</h2>} 
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

