import React, { useState, useEffect } from 'react';
import { EmailContext, FavoriteContext } from './contexts/Context';
import axios from 'axios';
import AllEmails from './components/AllEmails';

const App = () => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('UserFavoriteEmails')) || []);
  const [reads, setReads] = useState(JSON.parse(localStorage.getItem('UserReadEmails')) || []);
  const [page, setPage] = useState(1)

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const response = await axios.get(`https://flipkart-email-mock.now.sh/?page=${page}`);
        const emailList = response.data.list;

        if (emailList && emailList.length > 0){
          setEmails(emailList);
          setFilteredEmails(emailList);
          setLoading(false);
        }
       
      } catch (err) {

        setError('Failed to load emails');
        setLoading(false);
      }
    };
    loadEmails();
  }, [page]);
  

  // Mark email as favorite and update localStorage
  const markAsFavorite = (id) => {
    const updatedFavorites = new Set(favorites);
    let actionStatus = null;

    if (updatedFavorites.has(id)) {
      updatedFavorites.delete(id);
      actionStatus = 'removed';
    } else {
      updatedFavorites.add(id);
      actionStatus = 'added';
    }

    const updatedArray = Array.from(updatedFavorites);
    setFavorites(updatedArray);
    localStorage.setItem('UserFavoriteEmails', JSON.stringify(updatedArray));
    return actionStatus;
  };

  const markAsRead = (id) => {
    const updatedReads = new Set(reads);
    updatedReads.add(id);

    const updatedArray = Array.from(updatedReads);
    setReads(updatedArray);  // Update the state directly
    localStorage.setItem('UserReadEmails', JSON.stringify(updatedArray));  // Sync with localStorage

    // You can filter the emails right after marking as read to ensure the state is up to date
    filterReads();  // Ensure the filteredEmails are updated
};

  // Filter favorites
  const filterFavorites = () => {
    const favoriteEmails = emails.filter((email) => favorites.includes(email.id));
    setFilteredEmails(favoriteEmails);
  };

  // Filter read emails
  const filterReads = () => {
    const readEmails = emails.filter((email) => reads.includes(email.id));
    setFilteredEmails(readEmails);
  };

  // Filter unread emails
  const filterUnReads = () => {
    const unReadEmails = emails.filter((email) => !reads.includes(email.id));
    setFilteredEmails(unReadEmails);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, markAsFavorite }}>
      <EmailContext.Provider
        value={{
          filteredEmails,
          filterFavorites,
          filterReads,
          filterUnReads,
          loading,
          error, 
          markAsRead,
          setReads,
          reads,
          page,
          setPage
        }}
      >
        <div>
          <AllEmails />
        </div>
      </EmailContext.Provider>
    </FavoriteContext.Provider>
  );
};

export default App;
