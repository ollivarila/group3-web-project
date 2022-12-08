import React from 'react'
import './ItemForm.css'

const ItemForm = () => {
  return (
    <div className='formLayout'>
      <form>
        <h3>Add a New Item</h3>
        <div className="insideForm">
          <label >Name:</label>
          <input />
          <label>Amount:</label>
          <input />
          <label>Unit:</label>
          <input />
          <label>Comment:</label>
          <input />
          <button>Add Item</button>
          <button>Save List</button>
        </div>
      </form>
    </div>
  )
}

export default ItemForm
