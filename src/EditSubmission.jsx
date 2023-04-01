import React, { useState } from "react";
import SubmissionForm from "./SubmissionForm";
import AIPlanetLogo from "./images/AIPlanetLogo.png";
import {useLocation, useNavigate } from "react-router-dom";


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Submission() {
  const Navigate = useNavigate();
  const search = useQuery();

  const cardDetails = JSON.parse(localStorage.getItem("assignments"));
  const [currentAssignment] = cardDetails.filter(
    (obj) => obj.id == search.get("id"),
  );

  const [sub, setSub] = useState(currentAssignment);


  //!     Edit function     
  async function upload() {
    const filteredArray = cardDetails.filter(
        (obj) => obj.id != search.get("id"),
      );

      filteredArray.push(sub)
      localStorage.setItem("assignments", JSON.stringify(filteredArray))
    Navigate("/");
  }

  return (
    <div className='homeDiv '>
      <div className='nav px-40 h-16 flex items-center  bg-white'>
        <img className='w-30 flex-initial' src={AIPlanetLogo} alt='' />
      </div>
      <SubmissionForm setSub={setSub} sub={sub} upload={upload} />
    </div>
  );
}
