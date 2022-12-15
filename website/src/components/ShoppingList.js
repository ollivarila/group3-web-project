import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteList, updateList } from '../reducers/shoppingListReducer'
import Product from './Product'
import ItemForm from '../pages/Home/components/ItemForm'
import './list.css'
import { setCurrent } from '../reducers/currentShoppingListReducer'

const ListItems = ({ list }) => {
  if (!list) {
    return null
  }
  if (list === []) {
    return (<p>No content</p>)
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

const ShoppingList = () => {
  const dispatch = useDispatch()

  const shoppingList = useSelector((state) => state.current)
  const { title, comment, products } = shoppingList
  const [showForm, setShowform] = useState(false)

  useEffect(() => {
    setShowform(false)
  }, [shoppingList])

  const handleAddNewItem = () => {
    setShowform(true)
  }

  const handleNameChange = () => {
    dispatch(updateList(shoppingList, 'title', 'newName'))
  }
  const handleCommentchange = () => {
    dispatch(updateList(shoppingList, 'comment', 'updated2'))
  }

  const handleDelete = () => {
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
          <button className="changeComment" onClick={handleCommentchange}>
            Edit comment
          </button>
          <button className="changeName" onClick={handleNameChange}>
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
