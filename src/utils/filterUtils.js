// utils/filterUtils.js
export const handleFilterClick = (e, filterType, setIsSplitView, filterFavorites, filterReads, filterUnReads) => {
    setIsSplitView(false);  // Close the split view when a filter button is clicked
  
    // Remove the 'bg-[#E1E4EA]' class from all buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach((button) => button.classList.remove('bg-[#E1E4EA]'));
  
    // Add the 'bg-[#E1E4EA]' class to the clicked button
    e.target.classList.add('bg-[#E1E4EA]');
  
    // Apply the corresponding filter
    if (filterType === 'favorites') {
      filterFavorites();
    } else if (filterType === 'read') {
      filterReads();
    } else if (filterType === 'unread') {
      filterUnReads();
    }
  };
  