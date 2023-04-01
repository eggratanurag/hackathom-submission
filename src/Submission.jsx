import React, { useState } from "react";
import SubmissionForm from "./SubmissionForm";
import AIPlanetLogo from "./images/AIPlanetLogo.png";
import { useNavigate } from "react-router-dom";

export default function Submission() {
  const Navigate = useNavigate();

  const [sub, setSub] = useState({
    id: Math.random(),
    title: "",
    summary: "",
    description: "",
    img: "",
    hackathon: "",
    hackathonDate: {},
    uploadDate: new Date(),
    githubLink: "",
    otherLink: "",
    fav: false,
  });


  //!     uploading submission function     
  async function upload() {
    const prevData = await JSON.parse(localStorage.getItem("assignments"));

    if (prevData) {
      prevData.push(sub);
      localStorage.setItem("assignments", JSON.stringify(prevData));
    } else {
      const newArray = [sub];
      localStorage.setItem("assignments", JSON.stringify(newArray));
    }
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
