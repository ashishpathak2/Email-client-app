import React, { useState } from 'react';
import { EmailContext, FavoriteContext } from './contexts/Context';
import useEmails from './hooks/useEmails';
import useLocalStorage from './hooks/useLocalStorage';
import AllEmails from './components/AllEmails';

const App = () => {
  const [page, setPage] = useState(1);
  // Use custom hooks
  const { emails, filteredEmails, setFilteredEmails, loading, error } = useEmails(page);
  const [favorites, setFavorites] = useLocalStorage('UserFavoriteEmails', []);
  const [reads, setReads] = useLocalStorage('UserReadEmails', []);

  // Mark email as favorite
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
    return actionStatus;
  };

  // Mark email as read
  const markAsRead = (id) => {
    const updatedReads = new Set(reads);
    updatedReads.add(id);

    const updatedArray = Array.from(updatedReads);
    setReads(updatedArray);  // Update the state directly
  };

  // Filter favorite emails
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
