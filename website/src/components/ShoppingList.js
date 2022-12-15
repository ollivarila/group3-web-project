import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteList, updateList } from '../reducers/shoppingListReducer'
import Product from './Product'
import ItemForm from '../pages/Home/components/ItemForm'
import './list.css'
import './styles/editNameForm.css'
import './styles/editCommentForm.css'
import { setCurrent } from '../reducers/currentShoppingListReducer'

const ListItems = ({ list }) => {
  if (!list) {
    return null
  }
  if (list === []) {
    return <p>No content</p>
  }

  return (
    <ul className="shoppinglistUl">
      {list.map((p) => {
        return (
          <li key={Math.floor(Math.random() * 100000)}>
            <Product product={p} />
          </li>
        )
      })}
    </ul>
  )
}

const EditCommentForm = ({ handleEditCommentTrue, editComment, setEditComment,
  handleCommentchange }) => {
  const handleEditChange = (e) => {
    e.preventDefault()
    setEditComment(e.target.value)
  }

  return (
    <section className='commentEditForm'>
      <form >
        <label>Edit Comment</label>
        <input value={editComment} onChange={handleEditChange}/>
        <button className={'submitEdit'} onClick={() => handleCommentchange(editComment)}> Submit </button>
        <button className={'cancelButton'} onClick={() => handleEditCommentTrue(false)}>Cancel</button>
      </form>
    </section>
  )
}

const ShoppingList = () => {
  const dispatch = useDispatch()

  const shoppingList = useSelector((state) => state.current)
  const { title, comment, products } = shoppingList
  const [showForm, setShowform] = useState(false)

  const [showEditName, setShowEditName] = useState(false)
  const [showEditComment, setShowEditComment] = useState(false)
  const [editComment, setEditComment] = useState('')
  const [editName, setEditName] = useState('')

  const handleEditChange = (e) => {
    e.preventDefault()
    setEditName(e.target.value)
  }

  useEffect(() => {
    setShowform(false)
  }, [shoppingList])

  const handleAddNewItem = () => {
    setShowform(true)
    setShowEditComment(false)
    setShowEditName(false)
  }

  const handleEditNameTrue = (trueorfalse) => {
    setShowEditName(trueorfalse)
  }

  const handleEditCommentTrue = (trueorfalse) => {
    setShowEditComment(trueorfalse)
  }

  const handleNameChange = (editedName) => {
    dispatch(updateList(shoppingList, 'title', editedName))
    setShowEditName(!showEditName)
  }

  const handleCommentchange = (editedComment) => {
    dispatch(updateList(shoppingList, 'comment', editedComment))
    setShowEditComment(!showEditComment)
  }

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    setShowEditComment(false)
    setShowEditName(false)
    const confirmation = window.confirm(
      'are you sure you want to delete the list?',
    )
    if (confirmation) {
      dispatch(deleteList(shoppingList.id))
    }
  }

  if (!shoppingList) {
    return null
  }

  const handleClose = () => {
    dispatch(setCurrent(null))
  }
  const EditNameForm = () => {
    return (
      <section className='nameEditForm'>
        <form >
          <label>Edit Name</label>
          <input value={ editName } onChange={ (e) => handleEditChange(e)}/>
          <button className={ 'submitEdit' } onClick={() => handleNameChange(editName)}> Submit </button>
          <button className={ 'cancelButton' } onClick={() => handleEditNameTrue(false)}> Cancel </button>
        </form>
      </section>
    )
  }

  return (
    <section className="shoppinglistView">
      <section className="createItemForm">
        {showForm ? <ItemForm setShowForm={setShowform} /> : null}
      </section>
      <article className="shoppinglistContainer">
        <header>
          <button className="close" onClick={handleClose}>
            <b>X</b>
          </button>
          <h2>{title}</h2>
        </header>
        <ListItems list={products} />
        <button className="addItem" onClick={handleAddNewItem}>
          + Add new item
        </button>

        {comment && (
          <section className="comment">
            <p>{comment}</p>
          </section>
        )}

        <footer>
          <button className="changeComment" onClick={() => handleEditCommentTrue(true)}>
            Edit comment
          </button>
          <button className="changeName" onClick={ () => handleEditNameTrue(true)}>
            Change name
          </button>
          <button className="deleteList" onClick={handleDelete}>
            Delete
          </button>
        </footer>
      </article>

      <section className="createItemForm">
        {showForm ? <ItemForm setShowForm={setShowform}/> : null}
      </section>

      <section className='editComment'>
        {showEditComment ? <EditCommentForm
           editComment={editComment} 
           setEditComment={setEditComment} 
           handleEditCommentTrue={handleEditCommentTrue}
           handleCommentchange={handleCommentchange}
          /> : null}  
      </section>

      <section className='editName'>
        {showEditName ? <EditNameForm /> : null}
      </section>
    </section>
  )
}

export default ShoppingList

/*  editComment={editComment} 
        setEditComment={setEditComment} 
        handleEditCommentTrue={handleEditCommentTrue}
        handleCommentchange={handleCommentchange} 
        
        
              <section className='editName'>
        {showEditName ? <EditNameForm 
        editComment={editComment} 
        setEditComment={setEditComment} 
        handleEditCommentTrue={handleEditCommentTrue}
        handleCommentchange={handleCommentchange}
        /> : null}
      </section>*/