import React from 'react';

const Sidebar = ({ handleShowList, handleShowListAdding }) => {
  const testilista = [{ title: 'moi' }, { title: 'hei' }, { title: 'haloo' }];
  return (
    <section className="sidebar">
      <div className="buttonWrapper">
        <button className="addbutton" onClick={handleShowListAdding}>+ Uusi lista</button>
      </div>
      <div className="list">
        {testilista.map((list) => {
          return (
            <div key={list.title} className="buttonWrapper">
              <button className="listItem" onClick={() => handleShowList(list)}>{list.title}</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Sidebar;
