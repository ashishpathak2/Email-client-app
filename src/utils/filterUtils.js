export const handleFilterClick = (filterType, filterFavorites, filterReads, filterUnReads) => {
  // Apply the corresponding filter
  if (filterType === 'favorites') {
    filterFavorites();
  } else if (filterType === 'read') {
    filterReads();
  } else if (filterType === 'unread') {
    filterUnReads();
  }
};
