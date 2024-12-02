// import React from 'react'

import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

export default function ProjectForm() {
  const navigate = useNavigate();
  return (
    <>
      <div className=" shadow-sm px-6 py-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/projects')}
        >
          <MdKeyboardArrowLeft />
          <p className="text-sm text-muted tracking-wide capitalize text-[#0E382F] ">
            view all projects{' '}
          </p>
        </div>
        <h2 className="tracking-wide text-2xl capitalize font-semibold mt-2 text-[#0E382F]">
          add a new project
        </h2>
      </div>
      
      <div className="md:mx-24 md:my-10 shadow-2xl rounded-3xl">
        <form className="p-10 ">
          <div className="mb-12">
            <label className="block  capitalize mb-2 text-[#4F4F4F] tracking-wide text-lg">
              title
            </label>
            <input
              type="text"
              placeholder="Name"
              className="block w-full p-4  border  rounded-2xl  "
            />
          </div>
          <div>
            <label className="block  capitalize mb-2 text-[#4F4F4F] tracking-wide text-lg">
              description
            </label>
            <input
              type="text"
              placeholder="Description"
              className="block w-full p-8  border  rounded-2xl  "
            />
          </div>
          <div className='border my-10 border-[#D9D9D9] '>

          </div>

          <div className='flex justify-between items-center  ' >
            <Link to={"/projects"} className='border md:px-8 px-4 py-3 text-black rounded-full border-black'>Cancel</Link>
            <button className='bg-primary hover:bg-primary_hover md:px-8 px-4 py-3  text-white rounded-full'>Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
