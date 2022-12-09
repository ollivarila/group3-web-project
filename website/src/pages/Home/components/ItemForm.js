import React, { useState } from 'react'
import './ItemForm.css'
// import { comment } from 'postcss'

const ItemForm = () => {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [unit, setUnit] = useState('')
  const [comment, setComment] = useState('')
  // const [error, setError] = useState(null)
  // const [emptyFields, setEmptyFields] = useState([])

  const showInfo = () => {
    // eslint-disable-next-line no-alert
    alert(` name = ${name} amount = ${amount} unit = ${unit} comment = ${comment} `)
  }
  return (
    <div className='formLayout'>
      <form onSubmit={showInfo}>
        <h3>Add a New Item</h3>
        <div className="insideForm">
          <label >Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <label>Amount:</label>
          <input
            type="text"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <label>Unit:</label>
          <input
            type="text"
            onChange={(e) => setUnit(e.target.value)}
            value={unit}
          />
          <label>Comment:</label>
          <input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button>Add Item</button>
          <button>Save List</button>
        </div>
      </form>
    </div>
  )
}

export default ItemForm
