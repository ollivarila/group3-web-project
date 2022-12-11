import React , {useEffect}from 'react';
import './styles/sidebarstyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeShoppingLists } from '../reducers/shoppingListReducer'

const Sidebar = ({ handleShowList, handleShowListAdding }) => {
  const dispatch = useDispatch()
  const shoppingLists = useSelector((state) => state.shoppingLists)

  useEffect(() => {
    dispatch(initializeShoppingLists())
  }, [dispatch])
  //const shoppingLists = []
  console.log(shoppingLists)
  return (
    <section className="sidebar">
      <div className="buttonWrapper">
        <button className="addbutton" onClick={handleShowListAdding}>+ Add a new list</button>
      </div>
      <h3>My Lists</h3>
      <div className="list">
        {shoppingLists.map((list, index) => {
          return (
            <div key={index} className="buttonWrapper">
              <button className="listItem" onClick={() => handleShowList(list)}>{list.title}</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Sidebar;
