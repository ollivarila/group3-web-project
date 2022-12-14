import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createItem, deleteList, updateList } from '../reducers/shoppingListReducer'
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

const EditNameForm = ({ handleEditNameTrue, editName, setEditName, handleNameChange}) => {

  const handleEditChange = (e) => {
    setEditName(e.target.value)
  }

  return(
   <section className='nameEditForm'>
     <form >
       <label>Edit Name</label>
         <input value={editName} onChange={handleEditChange}/>
       <button className={"submitEdit"} onClick={() => handleNameChange(editName)}> Submit </button>
       <button className={'cancelButton'} onClick={handleEditNameTrue}> Cancel </button> 
      </form>
   </section>
 )
}


const EditCommentForm = ({ handleEditCommentTrue , editComment, setEditComment, handleCommentchange}) => {

  const handleEditChange = (e) => {
    setEditComment(e.target.value)
  }
  return (
  <section className='commentEditForm'>
    <form >
      <label>Edit Comment</label>
       <input value={editComment} onChange={handleEditChange}/>
      <button className={"submitEdit"} onClick={() => handleCommentchange(editComment)}> Submit </button>
      <button className={'cancelButton'} onClick={handleEditCommentTrue}> Cancel </button> 
    </form>
  </section>
  )
}


const ShoppingList = () => {

  const dispatch = useDispatch()

  const shoppingList = useSelector((state) => state.current)
  const { title, comment, products } = shoppingList
  const [showForm, setShowform] = useState(false)

  const [showEditName, setShowEditName] = useState (false)
  const [showEditComment, setShowEditComment] = useState (false)
  const [editComment, setEditComment] = useState ('')
  const [editName, setEditName] = useState('')

    useEffect(() => {
        setShowform(false)
    }, [shoppingList])


  const handleAddNewItem = () => {
        setShowform(true)
        setShowEditComment(false)
        setShowEditName(false)
  }
  
  const handleEditNameTrue = () => {
      setShowEditName(!showEditName)
  }

  const handleEditCommentTrue = () => {
    setShowEditComment(!showEditComment)
  }

  const handleNameChange = (editName) => {
    dispatch(updateList(shoppingList, 'title', editName))
    setShowEditName(!showEditName)
  }

  const handleCommentchange = (editComment) => {
    dispatch(updateList(shoppingList, 'comment', editComment))
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
          <button className="changeComment" onClick={handleEditCommentTrue}>
            Edit comment
          </button>
          <button className="changeName" onClick={handleEditNameTrue}>
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
         editName={editName}
          setEditName={setEditName} 
          handleEditNameTrue={handleEditNameTrue}
          handleNameChange={handleNameChange}
          /> : null}  
      </section>
      <section className='editName'>
        {showEditName ? <EditNameForm 
        editComment={editComment} 
        setEditComment={setEditComment} 
        handleEditCommentTrue={handleEditCommentTrue}
        handleCommentchange={handleCommentchange}
        /> : null}
      </section>

      <section className='editComment'>
        {showEditComment ? <EditCommentForm
         editName={editName}
          setEditName={setEditName} 
          handleEditNameTrue={handleEditNameTrue}
          handleNameChange={handleNameChange}
          /> : null}  
      </section>
      <section className='editName'>
        {showEditName ? <EditNameForm 
        editComment={editComment} 
        setEditComment={setEditComment} 
        handleEditCommentTrue={handleEditCommentTrue}
        handleCommentchange={handleCommentchange}
        /> : null}
      </section>
    </section>
  )
}

export default ShoppingList