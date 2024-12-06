// hooks/useEmails.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useEmails = (page) => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { emails, filteredEmails, setFilteredEmails, loading, error };
};

export default useEmails;
