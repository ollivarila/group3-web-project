import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createItem } from '../reducers/shoppingListReducer'
import Product from './Product'
import './list.css'


const handleAddNewItem = (list) => {
    const newItem = {
        name: 'New item',
        amount: null,
        unit: null,
        comment: null,
        checked: false
    }
    console.log(list,newItem);
    //createItem(list, newItem)

}

const ListItems = (props) => {
    const pList = props.products
    console.log(pList);
    if(pList === []){
        return <p>No content</p>
    }
    
    return (
        <ul className='shoppinglistUl'>
            {pList.map((p) => {
                return(
                    <li key={Math.floor(Math.random() * 100000)}>
                        <Product product={p}/>
                    </li>
                )  
            })}
            <li className='addItem'>
                <button onClick={handleAddNewItem(props.list)}>+ Add new item</button>
            </li>
        </ul>
    )
}


const ShoppingList = ({shoppingList}) => {

    const copy = {...shoppingList}
    const [productList, setProductList] = useState(copy.products)
    const [name, setName] = useState(copy.title)
    const [comment, setComment] = useState(copy.comment)

    
    const handleNameChange = () => {
        //updateList({comment: 'comment', ...list})
    }
    const handleCommentchange = () => {
        //updateingList({name: 'updated', ...list})
    }
    
    const handleDelete = () => {
        //deleteList(list)
    }
    
    return (
        <article className='shoppinglistContainer'>
            <header>
                {name}
            </header>
            <ListItems products={productList} list={name}/>
            <section className='comment'>
                <p>{comment}</p>
            </section>
            <footer>
                <button className='changeComment' onClick={handleCommentchange}>Edit comment</button>
                <button className='changeName' onClick={handleNameChange}>Change name</button>
                <button className='deleteList' onClick={handleDelete}>Delete</button>
                
            </footer>
        </article>
    )
}

export default ShoppingList