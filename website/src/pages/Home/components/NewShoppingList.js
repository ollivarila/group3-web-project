import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createShoppingList } from '../../../reducers/shoppingListReducer'
import './NewShoppingList.css'
// import { useDispatch, useSelector} from 'react-redux'
const NewShoppingList = ({ setWantsToCreate }) => {
  const [list, setList] = useState({ title: '', comment: '' })
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(createShoppingList(list))
    // setWantsToCreate(false)
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
