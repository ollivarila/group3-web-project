import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createShoppingList } from '../../../reducers/shoppingListReducer'
import './NewShoppingList.css'
import { useNavigate } from 'react-router-dom'
import ShoppingList from '../../../components/ShoppingList'

const NewShoppingList = ({ setWantsToCreate, setBackToDefault }) => {
  const [list, setList] = useState({ title: '', comment: '' })
  const dispatch = useDispatch()
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createShoppingList(list))
   // setWantsToCreate(false)
    //setBackToDefault(false)
  //  navigate('/ShoppingList');
  }

  const handleTitleChange = (e) => {
    setList({ ...list, title: e.target.value })
  }

  const handleCommentChange = (e) => {
    setList({ ...list, comment: e.target.value })
  }

  const handleCancel = () => {
    setWantsToCreate(false)
  }

  return (
    <div className="formLayout">
      <form>
        <h2>Make a New List</h2>
        <div className="insideForm">
          <label>Title:</label>
          <input type="text" onChange={handleTitleChange} value={list.title} />
          <label>Comment:</label>
          <input
            type="text"
            onChange={handleCommentChange}
            value={list.comment}
          />
          <button
            disabled={list.title === ''}
            type="submit"
            onClick={handleSubmit}>
            Save List
          </button>
          <button onClick={handleCancel} type="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewShoppingList
