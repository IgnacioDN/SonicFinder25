import React from 'react';

const Content = ({ items = [], searchQuery }) => {
  const safeSearchQuery = searchQuery ? searchQuery.toLowerCase() : '';

  const filteredItems = Array.isArray(items)
    ? items.filter((item) =>
        item.name && item.name.toLowerCase().includes(safeSearchQuery)
      )
    : []; 
  return (
    <section className="content">
      <h3></h3>
      <div className="cards-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="card">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </section>
  );
};

export default Content;

