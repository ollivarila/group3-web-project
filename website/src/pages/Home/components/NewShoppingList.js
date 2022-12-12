import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createShoppingList } from '../../../reducers/shoppingListReducer'
import './NewShoppingList.css'

const NewShoppingList = ({ setWantsToCreate }) => {
  //const [title, setTitle] = useState('')
  //const [comment, setComment] = useState('')
  const [list, setList] = useState({ title: '', comment: '' })
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('sdfds')
    dispatch(createShoppingList(list))
    setWantsToCreate(false)
  }

  const handleTitleChange = (e) => {
    setList({ ...list, title: e.target.value })
  }

  const handleCommentChange = (e) => {
    setList({ ...list, comment: e.target.value })
  }

  return (
    <div className="formLayout">
      <form onSubmit={handleSubmit}>
        <h3>Make a New List</h3>
        <div className="insideForm">
          <label>Title:</label>
          <input type="text" onChange={handleTitleChange} value={list.title} />
          <label>Comment:</label>
          <input
            type="text"
            onChange={handleCommentChange}
            value={list.comment}
          />
          <button disabled={list.title === ''} type="submit">
            Save List
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewShoppingList
