import React, { useContext, useState } from 'react';
import { EmailContext  } from '../contexts/Context';
import useEmailDetails from '../hooks/useEmailDetails';
import EmailList from './EmailList';
import EmailDetails from './EmailDetails';

const AllEmails = () => {
  const { filteredEmails, filterFavorites,filterReads ,filterUnReads, loading, error, setReads  } = useContext(EmailContext);
  const [isSplitView, setIsSplitView] = useState(false);
  const [activeEmailId, setActiveEmailId] = useState(null);
  const { fullEmailDetail, loading: emailLoading, error: emailError } = useEmailDetails(activeEmailId, filteredEmails);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }



  const handleScreenSplit = (id) => {
    setActiveEmailId(id);         // Set the active email ID
    setIsSplitView(true);         // Enable the split view

    // Check if the email is already marked as read
    const readEmails = JSON.parse(localStorage.getItem('UserReadEmails')) || [];

    // Ensure email ID is added if not already in the list
    if (!readEmails.includes(id)) {
        readEmails.push(id);
        localStorage.setItem('UserReadEmails', JSON.stringify(readEmails));  // Update localStorage
        setReads([...readEmails]);  // Update the reads state
    }
}

  

   const handleFilterClick = (e, filterType) => {
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


  
  return (
    <div className="bg-[#f4f5f9] flex flex-col items-center min-h-screen p-6 sm:p-12 lg:p-16 text-[#636363]">
      <div className="flex gap-2 mb-4 sm:mb-6 self-start font-medium">
        <h4 className="p-2">Filter By:</h4>
        <button className="filter-button hover:border-2 rounded-full px-4 sm:px-5 py-1" onClick={(e)=>{handleFilterClick(e,"unread")}}>Unread</button>
        <button className="filter-button hover:border-2 rounded-full px-4 sm:px-5 py-1" onClick={(e)=>{handleFilterClick(e,"read")}}>Read</button>
        <button className="filter-button hover:border-2 rounded-full px-4 sm:px-5 py-1" onClick={(e)=>{handleFilterClick(e,'favorites')}}>Favorites</button>
      </div>

      <div className="w-full flex flex-col lg:flex-row   lg:gap-4">
        <EmailList emails={filteredEmails} handleScreenSplit={handleScreenSplit} isSplitView={isSplitView} setIsSplitView={setIsSplitView} activeEmailId={activeEmailId} />
       

        {isSplitView && <EmailDetails fullEmailDetail={fullEmailDetail} isSplitView={isSplitView} setIsSplitView={setIsSplitView} />}
       
      </div>
    </div>
  );
};

export default AllEmails;
