import React, { useState } from 'react'
import './NewShoppingList.css'

const NewShoppingList = () => {
  const [title, setTitle] = useState('')
  const [owner, setOwner] = useState('')
  const [comment, setComment] = useState('')

 
const handleSubmit = async (e) => {
        e.preventDefault()
        // importtaa reducerista listan lisäys metodi ja käytä sitä. 
        // Mahd myös käyttäjä hae sieltä. 
    // eslint-disable-next-line no-alert
    alert(` name = ${title}  owner = ${owner} comment = ${comment} `)
  }
  
  return (
    <div className='formLayout'>
      <form onSubmit={handleSubmit}>
        <h3>Make a New List</h3>
        <div className="insideForm">
          <label>Title:</label>
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
          <button>Save List</button>
        </div>
      </form>
    </div>
  )
}

export default NewShoppingList
