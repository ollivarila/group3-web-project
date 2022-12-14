import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from '../../components/Sidebar'
import DefaultView from './DefaultView'
import NewShoppingList from './components/NewShoppingList'
import ShoppingList from '../../components/ShoppingList'
import './Home.css'
import { setCurrent } from '../../reducers/currentShoppingListReducer'

const Home = () => {
  const dispatch = useDispatch()

  const [wantsToCreate, setWantsToCreate] = useState(false)

  const selectedList = useSelector((state) => state.current)

  const handleAddToListClick = () => {
    setWantsToCreate(true)
    dispatch(setCurrent(null))
  }

  const handleListClick = () => {
    setWantsToCreate(false)
  }

  function homeContent() {
    if (wantsToCreate) {
      return <NewShoppingList setWantsToCreate={setWantsToCreate} />
    }
    if (selectedList) {
      return <ShoppingList />
    }

    return <DefaultView />
  }

  return (
    <>
      <Sidebar
        handleShowListAdding={handleAddToListClick}
        handleListClick={handleListClick}
      />
      <div className="content-container">{homeContent()}</div>
    </>
  )
}

export default Home
