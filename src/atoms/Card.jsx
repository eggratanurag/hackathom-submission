import React from "react";
import { useNavigate } from "react-router-dom";
import { DayCounter } from "../DayCounter";

export default function Card({ props }) {
  const { id, img, title, summary, uploadDate, hackathonDate } = props;
  const Navigate = useNavigate();

  return (
    <div
      onClick={() => Navigate(`/assignment?id=${id}`)}
      className='card p-6 h-72  shadow-3xl rounded-3xl bg-[#FFFFFF] cursor-pointer'
    >
      <div className='imageDiv  flex items-center gap-5'>
        <img
          className='object-cover w-24 h-24 rounded-md'
          src={img}
          alt='title'
        />
        <p className=' break-words overflow-hidden text-xl text-slate-900'>
          {title}
        </p>
      </div>
      <div className='break-words overflow-hidden cardData mt-5  text-md text-slate-800'>
        {summary}
      </div>
      <div className='dates text-sm text-slate-600'>
        {DayCounter(uploadDate)}
      </div>
    </div>
  );
}
