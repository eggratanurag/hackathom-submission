import React, {useState} from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Datepicker from "react-tailwindcss-datepicker";


export default function SubmissionForm({sub, setSub, upload}) {
  const [picLoading ,setPicLoading] = useState(false)
  let {title, summary, description, img, hackathon, hackathonDate, uploadDate, githubLink} = sub;


  //!     image loading mechanism     
  function imageUpload (image) {
    setPicLoading(true);
    if(image === undefined) {
      return;
    }
    if(image.type === 'image/jpeg' || image.type === 'image/png') {
      setPicLoading(true)
      const data = new FormData();
      data.append("file", image)
      data.append("upload_preset", "bookshelf")
      data.append("cloud_name", "dj6x7fggp");
      fetch("https://api.cloudinary.com/v1_1/dj6x7fggp/image/upload",{
      method: "post",
      body: data,
    })
    .then((res)=> res.json())
    .then(data=> {setSub((prev) => {return {...prev, img: data.url.toString()}})
      setPicLoading(false)
    })
    .catch(err=> {
      setPicLoading(false);
    })
    } else {
      setPicLoading(false);
      return;
    }
  }


 //!        hackathon date selector
const [value, setValue] = useState({startDate: "", endDate: ""});
const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue)
    setSub(prev => {return {...prev, hackathonDate: newValue}})
}

  return (
    <form onSubmit={()=> upload()}>
      <div className=" space-y-12 bg-white  py-16 lg:px-40 px-5 h-full">
        <div className=" pb-12">
          <h2 className="text-3xl font-medium text-gray-800">New Hackathon Submission</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-800">
                Title
              </label>
              <div className="mt-2 ">
                  <input
                    type="text"
                    maxLength={30}
                    className="block w-full text-base  py-3 pl-5 rounded-md border-0 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:leading-6"
                    placeholder='Title of your submission'
                    value={sub.title}
                    onChange={(e)=> setSub(prev => {return {...prev, title: e.target.value}})}
                  />
               
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-800">
                Summary
              </label>
              <div className="mt-2">
                <input
                  maxLength={100}
                  className=" block w-full text-base  py-3 pl-5 rounded-md border-0 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:leading-6"
                  placeholder="A short summary of your submission (this will be visible with your submission)"
                  value={sub.summary}
                  onChange={(e)=> setSub(prev => {return {...prev, summary: e.target.value}})}
                />
              </div>
            
            </div>
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  rows={4}
                  className="block w-full text-base py-3 pl-5 rounded-md border-0 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:leading-6"
                  placeholder="Write a long description of your project. You can describe your idea and approach here."
                  value={sub.description}
                  onChange={(e)=> setSub(prev => {return {...prev, description: e.target.value}})}
                />
              </div>
            
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-800">
                Cover Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-800/25 px-6 py-10">
                <div className="text-center">
                  {picLoading && "uploading..."}
                 {sub.img ?
                  <img src={sub.img} className='mx-auto h-12 w-12 rounded-md object-cover' /> :
                   <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative w-24 cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input 
                     onChange={e => imageUpload(e.target.files[0])}
                    
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      accept='image/*' className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-800/10">

          <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-800">
                Hackathon name
              </label>
              <div className="mt-2">
                <input
                  maxLength={30}
                  className="block w-full text-base py-3 pl-5 rounded-md border-0 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                  placeholder="Enter the name of the hackathon"
                  value={sub.hackathon}
                  onChange={(e)=> setSub(prev => {return {...prev, hackathon: e.target.value}})}
                />
              </div>
            
            </div>

            <div className='col-span-full rounded-md '>
            <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-800">
                Selete start date and end date
              </label>
            <div className="shadow-sm ring-1 rounded-md ring-gray-300 ">
           
            <Datepicker
                primaryColor={"blue"} 
                value={sub.hackathonDate}
                onChange={handleValueChange}
            />
            </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-800">
                Github Ripository
              </label>
              <div className="mt-2">
                <input
                  className="block w-full text-base py-3 pl-5 rounded-md border-0 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                  placeholder="Enter your submission’s public GitHub repository link"
                  value={sub.githubLink}
                  onChange={(e)=> setSub(prev => {return {...prev, githubLink: e.target.value}})}
                />
              </div>
            
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-800">
               Other Links
              </label>
              <div className="mt-2">
                <input
               
                  className="block w-full text-base py-3 pl-5 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6"
                  placeholder="You can upload a video demo or URL of you demo app here."
                  value={sub.otherLink}
                  onChange={(e)=> setSub(prev => {return {...prev, otherLink: e.target.value}})}
                />
              </div>
            
            </div>

          </div>
        </div>
            <button 
            onClick={()=> upload()} 
            className='btn btn-emerald text-white disabled:bg-slate-300'
            disabled={!(title && summary && description && img && hackathon && hackathonDate && uploadDate && githubLink)}
            >
              Upload Submission</button>
      </div>
    </form>
  )
}
