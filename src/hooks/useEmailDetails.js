// hooks/useEmailDetails.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useEmailDetails = (emailId, emails) => {
  const [fullEmailDetail, setFullEmailDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (emailId) {
      setLoading(true);
      axios
        .get(`https://flipkart-email-mock.now.sh/?id=${emailId}`)
        .then((response) => {
          const emailDetailById = emails.find((email) => email.id === emailId);
          const mergedEmailDetail = {
            ...emailDetailById,
            ...response.data,
          };
          setFullEmailDetail(mergedEmailDetail);
        })
        .catch((err) => {
          setError('Failed to fetch email details');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [emailId, emails]);

  return { fullEmailDetail, loading, error };
};

export default useEmailDetails;
