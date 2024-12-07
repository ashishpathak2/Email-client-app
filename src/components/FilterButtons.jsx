import React from 'react';

const FilterButtons = ({ handleFilterClick, activeFilter }) => {
  return (
    <div className="flex gap-2 mb-4 sm:mb-6 self-start font-medium">
      <h4 className="p-2">Filter By:</h4>
      <button
        className={`filter-button hover:border-2 rounded-full px-4 sm:px-5 py-1 ${
          activeFilter === 'unread' ? 'bg-[#E1E4EA]' : ''
        }`}
        onClick={(e) => handleFilterClick(e, 'unread')}
      >
        Unread
      </button>
      <button
        className={`filter-button hover:border-2 rounded-full px-4 sm:px-5 py-1 ${
          activeFilter === 'read' ? 'bg-[#E1E4EA]' : ''
        }`}
        onClick={(e) => handleFilterClick(e, 'read')}
      >
        Read
      </button>
      <button
        className={`filter-button hover:border-2 rounded-full px-4 sm:px-5 py-1 ${
          activeFilter === 'favorites' ? 'bg-[#E1E4EA]' : ''
        }`}
        onClick={(e) => handleFilterClick(e, 'favorites')}
      >
        Favorites
      </button>
    </div>
  );
};

export default FilterButtons;
