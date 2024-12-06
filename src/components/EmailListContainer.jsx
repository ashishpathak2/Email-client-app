// components/EmailListContainer.js
import React from 'react';
import EmailList from './EmailList';
import EmailDetails from './EmailDetails';

const EmailListContainer = ({ filteredEmails, handleScreenSplit, isSplitView, setIsSplitView, activeEmailId, fullEmailDetail }) => {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-4">
      <EmailList
        emails={filteredEmails}
        handleScreenSplit={handleScreenSplit}
        isSplitView={isSplitView}
        setIsSplitView={setIsSplitView}
        activeEmailId={activeEmailId}
      />
      {isSplitView && <EmailDetails fullEmailDetail={fullEmailDetail} isSplitView={isSplitView} setIsSplitView={setIsSplitView} />}
    </div>
  );
};

export default EmailListContainer;
