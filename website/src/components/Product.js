import React, { useState } from 'react'
import { updateItem } from '../reducers/shoppingListReducer'
import { useSelector, useDispatch } from 'react-redux'
import './Product.css'

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const EditProduct = ({ product, setEdit }) => {
  const selectedList = useSelector((state) => state.selected)
  const dispatch = useDispatch()
  const [name, setName] = useState(product.name || '')
  const [amount, setAmount] = useState(product.amount || '')
  const [unit, setUnit] = useState(product.unit || '')
  const [comment, setComment] = useState(product.comment || '')
  const [checked, setChecked] = useState(product.checked || false)

  const createProduct = () => {
    const newProduct = {}

    if (name) {
      newProduct.name = name
    }

    if (amount) {
      newProduct.amount = amount
    }

    if (unit) {
      newProduct.unit = unit
    }

    if (comment) {
      newProduct.comment = comment
    }

    if (checked) {
      newProduct.checked = checked
    }

    return newProduct
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = createProduct()

    dispatch(updateItem(selectedList.id, newProduct))
    setEdit(false)
  }

  return (
    <form className="editProductForm" onSubmit={handleSubmit}>
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <label>Amount</label>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} />

      <label>Unit</label>
      <input value={unit} onChange={(e) => setUnit(e.target.value)} />

      <label>Comment</label>
      <input value={comment} onChange={(e) => setComment(e.target.value)} />

      <div>
        <button className="submit" type="submit">
          submit
        </button>
        <button className="cancel" onClick={() => setEdit(false)}>
          cancel
        </button>
      </div>
    </form>
  )
}

const ProductDetails = ({ product, show }) => {
  const keys = Object.keys(product)

  return (
    <div className={show ? 'detailsContainer' : 'detailsContainerHidden'}>
      <hr />
      {keys.map((key) => {
        const val = product[key]
        const name = capitalize(key)

        return (
          <p key={val + Math.random()}>
            {name}: {val}
          </p>
        )
      })}
    </div>
  )
}

const Product = ({ product }) => {
  const [edit, setEdit] = useState(false)
  const [checked, setChecked] = useState(product.checked || false)
  const [showAll, setShowAll] = useState(false)

  const copy = {
    ...product,
  }

  if (edit) {
    return (
      <div className="product">
        <EditProduct product={copy} setEdit={setEdit} />
      </div>
    )
  }

  return (
    <div className="product">
      <div className="simpleContainer">
        <h3 className="name">{product.name}</h3>
        <div className="right">
          <p className="checkbox">
            Mark as done
            <input
              type="checkBox"
              onChange={(e) => {
                setChecked(!checked)
                console.log(checked)
              }}
              value={checked}
              checked={checked}
            />
          </p>
          <div className="buttons">
            <button onClick={() => setEdit(!edit)}>edit</button>
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? 'hide' : 'view'}
            </button>
          </div>
        </div>
      </div>
      {<ProductDetails product={product} show={showAll} />}
    </div>
  )
}

/*
      {keys.map((key) => {
        const val = copy[key]
        const name = capitalize(key)

        return (
          <p key={val + Math.random()}>
            {name}: {val}
          </p>
        )
      })}
      */

export default Product
