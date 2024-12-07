import React , {useContext} from 'react';
import EmailItem from './EmailItem';
import { EmailContext } from '../contexts/Context';


const EmailList= ({ emails, handleScreenSplit, isSplitView, activeEmailId , setIsSplitView }) => { 
    const {setPage , page } = useContext(EmailContext);
   
    return (
        <ul
            className={`flex flex-col gap-4 transition-all duration-300 ${isSplitView ? 'w-full lg:w-1/3' : 'w-full'}`}
        >
            {emails && emails.length > 0 ? (
                emails.map((email) => (
                    <EmailItem
                        key={email.id}
                        email={email}
                        onClick={() => handleScreenSplit(email.id)}
                        isActive={activeEmailId === email.id}
                        isSplitView={isSplitView} />
                ))
            ) : (
                <p>No emails available.</p>
            )}
            {emails.length > 0 && 
            <div className='flex items-center justify-center'>
          <button className="border-2 px-4 sm:px-7 py-2 rounded-full cursor-pointer bg-[#e54065] hover:bg-[#d4385c] text-white" onClick={() => {setPage((prev) => (prev >= 2 ? 1 : prev + 1));setIsSplitView(false)}} >Load more emails</button>
        </div>}
        
        </ul>
    );
}

export default EmailList;
