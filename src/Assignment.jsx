import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AIPlanetLogo from "./images/AIPlanetLogo.png";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DropDown from "./atoms/DropDown";
import GitHubIcon from "@mui/icons-material/GitHub";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MonthBasedDate } from "./DayCounter";
import Popup from "./atoms/Popup";

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Assignment() {
  const Navigate = useNavigate();
  const [deleteMode, setDeleteMode] = useState(false);
  const search = useQuery();

  const cardDetails = JSON.parse(localStorage.getItem("assignments"));
  const [currentAssignment] = cardDetails.filter(
    (obj) => obj.id == search.get("id"),
  );
  const [sub, setSub] = useState(currentAssignment);

  
  //! delete functionality
  async function deleteSubmission() {
    const cardDetails = JSON.parse(localStorage.getItem("assignments"));
    const filteredArray = cardDetails.filter(
      (obj) => obj.id != search.get("id"),
    );
    localStorage.setItem("assignments", JSON.stringify(filteredArray));
    Navigate("/");
  }


  //!  favourite button functionality
  useEffect(() => {
    const cardDetails = JSON.parse(localStorage.getItem("assignments"));
    const filteredArray = cardDetails.filter(
      (obj) => obj.id != search.get("id"),
    );
    filteredArray.push(sub);
    localStorage.setItem("assignments", JSON.stringify(filteredArray));
  }, [sub]);

  return (
    <div className='homeDiv '>
      <div className='nav px-40 h-16 flex items-center  bg-white'>
        <img className='w-30 flex-initial' src={AIPlanetLogo} alt='' />
      </div>
      <div className='homeDiv1 py-28 px-40  flex  bg-oxfordGreen text-white'>
        <div className='w-full  flex justify-between'>
          <div className='w-3/4'>
            <div className='imageDiv  flex items-center gap-10'>
              <img
                className='object-cover w-32 h-32 rounded-xl'
                src={currentAssignment.img}
                alt='title'
              />
              <p className='text-4xl font-semibold'>
                {currentAssignment.title}
              </p>
            </div>
            <div className='cardData mt-5  text-md'>
              {currentAssignment.summary}
            </div>
            <div className='dates  flex items-center gap-4 mt-4 justify-start text-xs'>
              <input
                onChange={() =>
                  setSub((prev) => {
                    return { ...prev, fav: !sub.fav };
                  })
                }
                type='checkbox'
                id='star'
                className='hidden'
              />
              <label className=' w-6' htmlFor='star'>
                {sub.fav ? <StarIcon /> : <StarBorderIcon />}
              </label>

              <div className='h-10 w-0 border-l'></div>
              <div className='bg-[#255973] flex gap-2 items-center rounded-full px-4 py-2'>
                <CalendarTodayIcon style={{ fontSize: "15px" }} />
                {MonthBasedDate(currentAssignment.uploadDate)}
              </div>
            </div>
          </div>
          <div className='w-40'>
            <button
              onClick={() =>
                Navigate(`/submission/edit?id=${currentAssignment.id}`)
              }
              className='mt-3 w-full  justify-center rounded-xl bg-transparent px-5 py-3 text-sm  text-white ring-1 ring-inset ring-white hover:bg-gray-50 hover:text-gray-700'
            >
              <EditIcon /> Edit
            </button>
            <button
              onClick={() => setDeleteMode(true)}
              className='mt-3 w-full justify-center rounded-xl bg-transparent px-5 py-3 text-sm  text-white ring-1 ring-inset ring-white hover:bg-gray-50 hover:text-gray-700'
            >
              <DeleteIcon /> Delete
            </button>
          </div>
        </div>
      </div>
      <div className='homeDiv2 flex justify-between gap-10 px-40 py-12 bg-white min-h-screen '>
        <div className='w-10/12 justify-between items-center '>
          <h1 className='text-2xl pb-6'>Description</h1>
          <p>{currentAssignment.description}</p>
        </div>

        <div className='linkDiv w-1/4 px-2 '>
          <p className='text-xl text-slate-500'>Hackathon</p>
          <p className='text-2xl'>{currentAssignment.hackathon}</p>
          <div className=' flex items-center gap-2'>
            <CalendarTodayIcon style={{ fontSize: "20px", color: "gray" }} />
            <p className='text-sm text-slate-500'>
              {currentAssignment.hackathonDate.startDate}
            </p>
            <p>-</p>
            <p className='text-sm text-slate-500'>
              {currentAssignment.hackathonDate.endDate}
            </p>
          </div>
          <a
            href={currentAssignment.githubLink}
            className=' mt-12 flex items-center gap-2 cursor-pointer justify-center rounded-xl bg-white px-3 py-3 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-50'
          >
            <GitHubIcon /> Github Link
          </a>
          <a
            href={currentAssignment.otherLink}
            className=' flex items-center gap-2 cursor-pointer justify-center rounded-xl bg-white px-3 py-3 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-600 hover:bg-gray-50'
          >
            Other link
          </a>
        </div>
      </div>

      {deleteMode && (
        <Popup
          setDeleteMode={setDeleteMode}
          title={currentAssignment.title}
          deleteSubmission={deleteSubmission}
        />
      )}
    </div>
  );
}
