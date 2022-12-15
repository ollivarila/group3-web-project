import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteList, updateList } from '../reducers/shoppingListReducer'
import Product from './Product'
import ItemForm from '../pages/Home/components/ItemForm'
import './list.css'
import './styles/editNameForm.css'
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

const EditNameForm = ({ handleShowEditName, editName, setEditName, handleTitleSubmit }) => {

  const handleEditChange = (e) => {
    e.preventDefault()
    setEditName(e.target.value)
  }

  return (
    <section className='editForm'>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleTitleSubmit(editName)
      }}>
        <label>Edit Name</label>
        <input value={ editName } onChange={handleEditChange}/>
        <footer className='buttonFooter'>
        <button type='submit' className={'submitEdit' } > Submit </button>
        <button type='reset' className={ 'cancelButton' } onClick={() => handleShowEditName(false)}> Cancel </button>
        </footer>
      </form>
    </section>
  )
}

const EditCommentForm = ({ handleShowEditComment, editComment, setEditComment,
  handleCommentSubmit }) => {
  const handleEditChange = (e) => {
    e.preventDefault()
    setEditComment(e.target.value)
  }

  return (
    <section className='editForm'>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleCommentSubmit(editComment)}
      }>
     
        <label>Edit Comment</label>
        <input value={editComment} onChange={handleEditChange}/>
        <footer className='buttonFooter'>
        <button type='submit' className={'submitEdit'}> Submit </button>
        <button type='reset' className={'cancelButton'} onClick={() => handleShowEditComment(false)}>Cancel</button>
        </footer>
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

  useEffect(() => {
    setShowform(false)
  }, [shoppingList])

  const handleAddNewItem = () => {
    setShowform(true)
    setShowEditComment(false)
    setShowEditName(false)
  }

  const handleShowEditName = (trueorfalse) => {
    setShowEditName(trueorfalse)
  }

  const handleShowEditComment = (trueorfalse) => {
    setShowEditComment(trueorfalse)
  }

  const handleTitleSubmit = (editedName) => {
    dispatch(updateList(shoppingList, 'title', editedName))
    setShowEditName(false)
  }

  const handleCommentSubmit = (editedComment) => {
    dispatch(updateList(shoppingList, 'comment', editedComment))
    setShowEditComment(false)
  }

  const handleDelete = () => {
    setShowEditComment(false)
    setShowEditName(false)
    // eslint-disable-next-line no-alert
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
        <section className='editComment'>
        {showEditComment ? <EditCommentForm
          editComment={editComment}
          setEditComment={setEditComment}
          handleShowEditComment={handleShowEditComment}
          handleCommentSubmit={handleCommentSubmit}
        /> : null}
      </section>

      <section className='editName'>
        {showEditName ? <EditNameForm
          editName={editName}
          setEditName={setEditName}
          handleShowEditName={handleShowEditName}
          handleTitleSubmit={handleTitleSubmit}
        /> : null}
      </section>
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
          <button className="changeComment" onClick={() => {
            handleShowEditName(false)
            handleShowEditComment(true)
          } }>
            Edit comment
          </button>
          <button className="changeName" onClick={ () => {
            handleShowEditComment(false)
            handleShowEditName(true)}}>
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
    </section>
  )
}

export default ShoppingList
