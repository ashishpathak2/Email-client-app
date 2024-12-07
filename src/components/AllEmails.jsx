import React, { useContext, useState } from 'react';
import { EmailContext } from '../contexts/Context';
import useEmailDetails from '../hooks/useEmailDetails';
import FilterButtons from './FilterButtons';
import EmailListContainer from './EmailListContainer';
import { handleFilterClick as applyFilter } from '../utils/filterUtils';

const AllEmails = () => {
  const { filteredEmails, filterFavorites, filterReads, filterUnReads, loading, error, setReads } = useContext(EmailContext);
  const [isSplitView, setIsSplitView] = useState(false);
  const [activeEmailId, setActiveEmailId] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null); // Track the active filter button
  const { fullEmailDetail, loading: emailLoading, error: emailError } = useEmailDetails(activeEmailId, filteredEmails);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleScreenSplit = (id) => {
    setActiveEmailId(id); // Set the active email ID
    setIsSplitView(true); // Enable the split view

    // Check if the email is already marked as read
    const readEmails = JSON.parse(localStorage.getItem('UserReadEmails')) || [];

    // Ensure email ID is added if not already in the list
    if (!readEmails.includes(id)) {
      readEmails.push(id);
      localStorage.setItem('UserReadEmails', JSON.stringify(readEmails)); // Update localStorage
      setReads([...readEmails]); // Update the reads state
    }
  };

  const handleFilterClick = (e, filterType) => {
    setIsSplitView(false); // Close the split view when a filter button is clicked
    setActiveFilter(filterType); // Update the active filter state
    applyFilter(filterType, filterFavorites, filterReads, filterUnReads);
  };

  return (
    <div className="bg-[#f4f5f9] flex flex-col items-center min-h-screen p-6 sm:p-12 lg:p-16 text-[#636363]">
      <FilterButtons handleFilterClick={handleFilterClick} activeFilter={activeFilter} />

      <EmailListContainer
        filteredEmails={filteredEmails}
        handleScreenSplit={handleScreenSplit}
        isSplitView={isSplitView}
        setIsSplitView={setIsSplitView}
        activeEmailId={activeEmailId}
        fullEmailDetail={fullEmailDetail}
      />
    </div>
  );
};

export default AllEmails;
