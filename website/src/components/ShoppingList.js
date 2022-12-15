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


const EditForm = ({ handleCancel, editComment, setEditComment,
  handleCommentSubmit, title }) => {
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
     
        <label>{title}</label>
        <input value={editComment} onChange={handleEditChange}/>
        <footer className='buttonFooter'>
        <button type='submit' className={'submitEdit'}> Submit </button>
        <button type='reset' className={'cancelButton'} onClick={() => handleCancel()}>Cancel</button>
        </footer>
      </form>
    </section>
  )
}

const ShoppingList = () => {
  const dispatch = useDispatch()

  const shoppingList = useSelector((state) => state.current)
  const { title, comment, products } = shoppingList

  const [show, setShow] = useState('')

  const [editComment, setEditComment] = useState('')
  const [editName, setEditName] = useState('')

  useEffect(() => {
    setShow('')
  }, [shoppingList])

  const handleAddNewItem = () => {
    setShow('form')
  }

  const handleShowEditName = () => {
    setShow('name')
  }

  const handleShowEditComment = () => {
    setShow('comment')
  }

  const handleCancel = () => {
    setShow('')
  }

  const handleTitleSubmit = (editedName) => {
    dispatch(updateList(shoppingList, 'title', editedName))
    setShow('')
  }

  const handleCommentSubmit = (editedComment) => {
    dispatch(updateList(shoppingList, 'comment', editedComment))
    setShow('')
  }

  const handleDelete = () => {
    setShow('')
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
        {show === 'comment' ? <EditForm
          title={'Edit comment'}
          editComment={editComment}
          setEditComment={setEditComment}
          handleCancel={handleCancel}
          handleCommentSubmit={handleCommentSubmit}
        /> : null}
      </section>

      <section className='editName'>
        {show === 'name' ? <EditForm
          title={'Edit name'}
          editName={editName}
          setEditName={setEditName}
          handleCancel={handleCancel}
          handleTitleSubmit={handleTitleSubmit}
        /> : null}
      </section>
      <section className="createItemForm">
        {show === 'form' ? <ItemForm setShowForm={setShow} /> : null}
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
            handleShowEditComment(true)
          } }>
            Edit comment
          </button>
          <button className="changeName" onClick={ () => {
            handleShowEditName(true)}}>
            Change name
          </button>
          <button className="deleteList" onClick={handleDelete}>
            Delete
          </button>
        </footer>
      </article>
    </section>
  )
}

export default ShoppingList
