import React, { useState, useEffect } from "react";
import AIPlanetLogo from "./images/AIPlanetLogo.png";
import Handholdingbulb from "./images/Handholdingbulb.png";
import DropDown from "./atoms/DropDown";
import Card from "./atoms/Card";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const Navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [arrange, setArrange] = useState("newest");
  const [page, setPage] = useState("all");
  const cardDetails = JSON.parse(localStorage.getItem("assignments"));


 
  //!     sorting mechanism   
  function sort(cardDetails) {
    if (arrange === "newest") {
      let sortByNewest = cardDetails.sort((a, b) =>
        a.hackathonDate.startDate
          .split("/")
          .reverse()
          .join()
          .localeCompare(b.hackathonDate.startDate.split("/").reverse().join()),
      );
      return sortByNewest;
    } else if (arrange === "oldest") {
      let sortByOldest = cardDetails.sort((a, b) =>
        b.hackathonDate.startDate
          .split("/")
          .reverse()
          .join()
          .localeCompare(a.hackathonDate.startDate.split("/").reverse().join()),
      );
      return sortByOldest;
    }
  }

  return (
    <div className='homeDiv'>
      <div className='nav px-40 h-16 flex items-center  bg-white'>
        <img className='w-30 flex-initial' src={AIPlanetLogo} alt='' />
      </div>
      <div className='homeDiv1 py-16 px-40  flex  bg-oxfordGreen text-white'>
        <div className='flex items-center gap-32 '>
          <div className=' py-5  '>
            <h1 className='text-4xl font-semibold'>Hackathon Submissions</h1>
            <p className='font-poppins my-5'>
              It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <button
              onClick={() => Navigate("/submission")}
              className='btn btn-emerald'
            >
              Upload Submission
            </button>
          </div>

          <img className='w-48' src={Handholdingbulb} alt='' />
        </div>
      </div>
      {cardDetails ? (
        <div className='homeDiv2 px-40 min-h-screen bg-white'>
          <div className='nav2 flex h-12 pt-16 py-12 justify-between items-center'>
            <div className='flex  gap-1 '>
              <div className=' text-center'>
                <input
                  onChange={() => setPage("all")}
                  checked={page === "all" ? true : false}
                  type='radio'
                  id='radio1'
                  name='submissions'
                />
                <label htmlFor='radio1'>All Submissions</label>
              </div>
              <div className='text-center'>
                <input
                  onChange={() => setPage("fav")}
                  type='radio'
                  id='radio2'
                  name='submissions'
                />
                <label htmlFor='radio2'>Favourite Submissions</label>
              </div>
            </div>

            <div className='flex gap-6'>
              <input
                id='search'
                name='search'
                className='w-80 px-16 flex items-center rounded-full border-0 py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-gray-400 placeholder:text-lg focus:ring-inset sm:text-sm sm:leading-6'
                placeholder='Search'
                style={{ display: page === "all" ? "block" : "none" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <DropDown
                page={page}
                sort={sort}
                setArrange={setArrange}
                arrangeBy={arrange}
              />
            </div>
          </div>

          <div className='cardsDiv mt-12'>
            {page === "all" &&
              sort(cardDetails)
                .filter((cardDetail) => {
                  if (searchTerm == "") {
                    return cardDetail;
                  } else if (
                    cardDetail.title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return cardDetail;
                  }
                })
                .map((cardDetail) => (
                  <React.Fragment key={cardDetail.id}>
                    <Card props={cardDetail} />
                  </React.Fragment>
                ))}

            {page === "fav" &&
              cardDetails.map(
                (cardDetail) =>
                  cardDetail.fav === true && (
                    <React.Fragment key={cardDetail.id}>
                      <Card props={cardDetail} />
                    </React.Fragment>
                  ),
              )}
          </div>
        </div>
      ) : (
        <div className='mt-32 px-40 justify-between items-center '>
          <h1 className='text-2xl pb-6'>
            You have not submitted any hackathon
          </h1>
        </div>
      )}
    </div>
  );
}
