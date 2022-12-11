import React, { useState } from 'react'
import './NewShoppingList.css'

const NewShoppingList = () => {
  const [title, setTitle] = useState('')
  const [productList, setProductList] = useState([])
  const [owner, setOwner] = useState('')
  const [comment, setComment] = useState('')

 
const handleSubmit = async (e) => {
        e.preventDefault()
    // eslint-disable-next-line no-alert
    alert(` name = ${title} amount = ${productList} unit = ${owner} comment = ${comment} `)
  }
  
  return (
    <div className='formLayout'>
      <form onSubmit={handleSubmit}>
        <h3>Add a New List</h3>
        <div className="insideForm">
          <label >Title:</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label>ProductList:</label>
         <p> Tänne tulisi näkyviin kaikki lisätyt itemit</p>
          <label>Comment:</label>
          <input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        <label>Owner:</label>
          <input
            type="text"
            onChange={(e) => setOwner(e.target.value)}
            value={owner}
          /> 
          <button>Add items</button>
          <button>Save List</button>
        </div>
      </form>
    </div>
  )
}

export default NewShoppingList
