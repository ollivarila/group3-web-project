import React, { useState } from 'react'
import './ItemForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { createItem } from '../../../reducers/shoppingListReducer'

const ItemForm = ({ setShowForm }) => {
  
  const [error, setError] = useState('')
  const [item, setItem] = useState({
    name: '',
    amount: '',
    unit: '',
    comment: '',
  })
  const list = useSelector((state) => state.current)
  const dispatch = useDispatch()

  const handleNameChange = (e) => {
    setItem({ ...item, name: e.target.value })
  }
  const handleUnitChange = (e) => {
    setItem({ ...item, unit: e.target.value })
  }

  const handleAmountChange = (e) => {
    setItem({ ...item, amount: e.target.value })
  }

  const handleCommentChange = (e) => {
    setItem({ ...item, comment: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(
        'itemform current list id',
        list.id,
        'current list name',
        list.title,
        'item',
        item,
      )
      dispatch(createItem(list.id, item))
      setShowForm(false)
    } catch (err) {
      setError(err.message)
      console.log(error)
    }
  }
  const handleCancel = () => {
    setShowForm(false)
  }
  return (
    <div className="formLayout">
      <form className="ItemForm">
        <h3>Add a New Item to {list.title} list </h3>

        <div className="insideForm">
          <label>Name:</label>
          <input type="text" onChange={handleNameChange} value={item.name} />
          <label>Amount:</label>
          <input
            type="text"
            onChange={handleAmountChange}
            value={item.amount}
          />
          <label>Unit:</label>
          <input type="text" onChange={handleUnitChange} value={item.unit} />
          <label>Comment:</label>
          <input
            type="text"
            onChange={handleCommentChange}
            value={item.comment}
          />
          <button onClick={handleSubmit}>Add Item</button>
          <button onClick={handleCancel} type="reset">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ItemForm
