import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import DefaultView from './DefaultView'
import NewShoppingList from './components/NewShoppingList'
import './Home.css'

const Home = () => {
  const [wantsToCreate, setWantsToCreate] = useState(false)

  const selectedList = useSelector((state) => state.current)

  const handleAddToListClick = () => {
    setWantsToCreate(true)
  }

  console.log(selectedList)
  return (
    <>
      <Sidebar handleShowListAdding={handleAddToListClick} />
      <div className="content-container">
        {selectedList ? null : <DefaultView />}
        {wantsToCreate ? (
          <NewShoppingList setWantsToCreate={setWantsToCreate} />
        ) : null}
      </div>
    </>
  )
}

export default Home
