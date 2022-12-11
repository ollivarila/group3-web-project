import React from 'react';
import './styles/sidebarstyle.css'

const Sidebar = ({ handleShowList, handleShowListAdding }) => {
  const shoppingLists = [{ title: 'moi' }, { title: 'hei' }, { title: 'haloo' }];
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
