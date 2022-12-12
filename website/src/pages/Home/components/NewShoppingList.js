import React, { useState } from 'react'
import {createShoppingList} from '../../../reducers/shoppingListReducer';
import './NewShoppingList.css'

const NewShoppingList = () => {
  //const [title, setTitle] = useState('')
  //const [comment, setComment] = useState('')
  const [list, setList] = useState({title: "", comment: ""})

const handleSubmit = async (e) => {
      e.preventDefault()
      createShoppingList(list)
  }

  const handleTitleChange = (e) => {
    setList ({...list, title: e.target.value})
  }

  const handleCommentChange = (e) => {
    setList ({...list, comment: e.target.value})
  }
  
  return (
    <div className='formLayout'>
      <form onSubmit={handleSubmit}>
        <h3>Make a New List</h3>
        <div className="insideForm">
          <label>Title:</label>
          <input
            type="text"
            onChange={handleTitleChange}
            value={list.title}
          />
          <label>ProductList:</label>
         <p> Tänne tulisi näkyviin kaikki lisätyt itemit</p>
          <label>Comment:</label>
          <input
            type="text"
            onChange={handleCommentChange}
            value={list.comment}
          />
          <button>Save List</button>
        </div>
      </form>
      <p style={{color: 'white'}}> Listan title on {list.title} ja kommentti on {list.comment} </p>

    </div>
  )
}

export default NewShoppingList
