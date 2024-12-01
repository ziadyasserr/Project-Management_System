// import React from 'react'
import { useContext } from 'react';
import { BsListTask } from 'react-icons/bs';
import { GiProgression } from 'react-icons/gi';
import { GoProjectSymlink } from 'react-icons/go';

import header from '../../../assets/header.png';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

import { Link } from "react-router-dom";

export default function Dashboard() {
  const { loginData } = useContext(AuthContext);

  return (

    <>
      <header
        className="relative bg-cover bg-center  text-white flex items-center h-[280px] rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `url(${header})`,
        }}
      >
        <div className="absolute inset-0 bg-[rgba(49,89,81,0.44)] z-10 "></div>

        <div className=" z-20 p-5">
          <h6 className="text-4xl tracking-wide">
            Welcome{' '}
            <span className="text-primary tracking-wider">
              {loginData?.userName}
            </span>
          </h6>
          <span className="block mt-10 text-2xl tracking-wider">
            You can add projects and assign tasks to your team
          </span>
        </div>
      </header>

      <div className="grid md:grid-cols-8 grid-cols-2 mt-10 gap-10 ">
        <div className="md:col-span-4 col-span-2 bg-[#F8F9FB] p-6 rounded-2xl ">
          <div className=' border-l-4  border-primary '>
            <span className="block font-semibold tracking-wide ms-5">Tasks</span>
            <span className="block text-gray-500 ms-5">
              Lorem ipsum dolor sit amet,consecteture
            </span>
          </div>
          <div className="mt-6 grid grid-cols-6 gap-5">
            <div className="md:col-span-2 col-span-3">
              <div className="bg-[#E5E6F4] rounded-xl  p-4">
                <GiProgression className="text-3xl   bg-[#CFD1EC] rounded-xl " />
                <span className="block text-[#6F7881] my-1">progress</span>
                <span className="block text-black text-lg tracking-wider">
                  $ 1234
                </span>
              </div>
            </div>
            <div className="md:col-span-2 col-span-3 ">
              <div className="bg-[#F4F4E5] rounded-xl  p-4">
                <BsListTask className="text-3xl   bg-[#E4E4BC] rounded-xl " />
                <span className="block text-[#6F7881] my-1">Tasks Num</span>
                <span className="block text-black text-lg tracking-wider">
                  $ 7588
                </span>
              </div>
            </div>
            <div className="md:col-span-2 col-span-3 ">
              <div className="bg-[#F4E5ED] rounded-xl  p-4">
                <GoProjectSymlink className="text-3xl   bg-[#E7C3D7] rounded-xl " />
                <span className="block text-[#6F7881] my-1">Projects Num</span>
                <span className="block text-black text-lg tracking-wider">
                  $ 5748
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-4  col-span-2 bg-[#F8F9FB] p-6 rounded-2xl ">
          <div className='border-l-4  border-primary'>
            <span className="block font-semibold tracking-wide ms-5">Users</span>
            <span className="block text-gray-500 ms-5">
              Lorem ipsum dolor sit amet,consecteture
            </span>
          </div>
          <div className="mt-6 grid grid-cols-6 gap-5">
            <div className="md:col-span-2 col-span-3 ">
              <div className="bg-[#E5E6F4] rounded-xl  p-4">
                <GiProgression className="text-3xl   bg-[#CFD1EC] rounded-xl " />
                <span className="block text-[#6F7881] my-1">Active</span>
                <span className="block text-black text-lg tracking-wider">
                  $ 1234
                </span>
              </div>
            </div>
            <div className="md:col-span-2 col-span-3 ">
              <div className="bg-[#F4F4E5] rounded-xl  p-4">
                <BsListTask className="text-3xl   bg-[#E4E4BC] rounded-xl " />
                <span className="block text-[#6F7881] my-1">Inactive</span>
                <span className="block text-black text-lg tracking-wider">
                  $ 7588
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );


  )

}
