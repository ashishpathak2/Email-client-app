import React, { useContext } from 'react';
import formatDateTime from '../utilities/formatDateTime';
import { EmailContext, FavoriteContext } from '../contexts/Context';

const EmailItem = ({ email, onClick, isActive, isSplitView }) => {
  const { favorites } = useContext(FavoriteContext);
  const { reads } = useContext(EmailContext);
  const isFavorite = favorites.includes(email.id);
  const isRead = reads.includes(email.id)

  return (
    <li
      key={email.id}
      className={`border-2 px-4 sm:px-7 py-2 rounded-lg flex gap-4 sm:gap-6 cursor-pointer hover:border-[#cacfde] ${
        isRead ? 'bg-[#f2f2f2]' : "bg-white"
      } ${isActive && "border-[#cacfde]"}` }
      onClick={onClick}
    >
      <div className="rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#e54065] flex items-center justify-center text-sm sm:text-xl lg:text-2xl text-white">
        {email.from.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <header className="mb-2 sm:mb-3">
          <p className="text-xs sm:text-sm mb-1">
            From: <span className="font-semibold">{email.from.name} ({email.from.email})</span>
          </p>
          <p className="text-xs sm:text-sm">
            Subject: <span className="font-semibold">{email.subject}</span>
          </p>
        </header>
        <section className="overflow-hidden">
          <p className="text-sm mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {isSplitView
              ? `${email.short_description.split(' ').slice(0, 6).join(' ')}${
                  email.short_description.split(' ').length > 6 ? '...' : ''
                }`
              : email.short_description}
          </p>
          <p className="flex justify-between w-48 text-xs text-gray-500">
            <span>{email.date && formatDateTime(email.date)}</span>
            {isFavorite && <span className='font-bold'>Favorite</span>}
          </p>
        </section>
      </div>
    </li>
  );
};

export default EmailItem;
