import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createItem, deleteList, updateList } from '../reducers/shoppingListReducer'
import Product from './Product'
import ItemForm from '../pages/Home/components/ItemForm'
import './list.css'





const ListItems = ({list}) => {

    if(list === []){
        return <p>No content</p>
    }
    
    return (
        <ul className='shoppinglistUl'>
            {list.map((p) => {
                return(
                    <li key={Math.floor(Math.random() * 100000)}>
                        <Product product={p}/>
                    </li>
                )  
            })}
            
        </ul>
    )
}


const ShoppingList = () => {

    

    const dispatch = useDispatch()

    const shoppingList = useSelector(state => state.current)
    const { title, comment, products } = shoppingList
    const [showForm, setShowform] = useState(false)

    useEffect(() => {
        setShowform(false)
        console.log('setfalse');
    }, [shoppingList])

    const handleAddNewItem = () => {
        setShowform(true)
        console.log(shoppingList)
    }

    const handleNameChange = () => {
        dispatch(updateList(shoppingList, {comment: 'newcomment', ...shoppingList}))
    }
    const handleCommentchange = () => {
        dispatch(updateList(shoppingList, {title: 'updated', ...shoppingList}))
    }
    
    const handleDelete = () => {
        const confirmation = window.confirm('are you sure you want to delete the list?')
        if(confirmation){
            dispatch(deleteList(shoppingList.id))
        }     
    } 
    return (
        <>
        
        <article className='shoppinglistContainer'>
            <header>
                {title}
            </header>
            <ListItems list={products}/>
            <button className='addItem' onClick={handleAddNewItem}>+ Add new item</button>
            <section className='comment'>
                <p>{comment}</p>
            </section>
            
            <footer>
                <button className='changeComment' onClick={handleCommentchange}>Edit comment</button>
                <button className='changeName' onClick={handleNameChange}>Change name</button>
                <button className='deleteList' onClick={handleDelete}>Delete</button>
                
            </footer>
            
        </article>
        <section className="createItemForm">
            {showForm ? <ItemForm /> : null}
        </section>
        </>
    )
}

export default ShoppingList