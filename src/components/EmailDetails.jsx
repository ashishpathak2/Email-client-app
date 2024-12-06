import { useContext } from 'react';
import { FavoriteContext } from '../contexts/Context';
import formatDateTime from '../utilities/formatDateTime';

const EmailDetails = ({ fullEmailDetail, isSplitView, setIsSplitView }) => {
  const { favorites, markAsFavorite } = useContext(FavoriteContext);  
  const isFavorite = favorites.includes(fullEmailDetail.id);

  const handlefavoriteBtn=(id)=>{
    const actionStatus = markAsFavorite(id)
    if (actionStatus === "removed") {
      setIsSplitView(false)
    }
  }

  return (
    <div className="w-full ml-5 flex h-full lg:w-2/3 bg-white rounded-lg shadow-md border border-[#cacfde] p-6 sm:p-9">
      <section className="flex flex-col">
        <div className="rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#e54065] flex items-center justify-center text-sm sm:text-xl lg:text-2xl text-white">
          {fullEmailDetail.from?.name?.charAt(0).toUpperCase()}
        </div>
      </section>

      <div className="flex flex-col gap-7 justify-evenly px-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold mb-4">{fullEmailDetail.subject}</h1>
            <span>{fullEmailDetail.date && formatDateTime(fullEmailDetail.date)}</span>
          </div>
          <button
            className="bg-[#e54065] text-white text-sm text-center h-8 px-5 rounded-full"
            onClick={() =>handlefavoriteBtn(fullEmailDetail.id)}
          >
            {isFavorite ? "Unmark from favorites" : "Mark as favorite"}
          </button>
        </div>
        <div className="text-base leading-5" dangerouslySetInnerHTML={{ __html: fullEmailDetail.body }} />
        <button
          className="mt-4 px-4 py-2 bg-[#e54065] text-white rounded-full hover:bg-[#d4385c]"
          onClick={() => setIsSplitView(false)}
        >
          Back to Full View
        </button>
      </div>
    </div>
  );
};

export default EmailDetails;
