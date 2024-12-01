import React from 'react'
import { BiExpandVertical } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { IoIosSearch } from 'react-icons/io'

export default function ProjectsList() {
  return (

    <>

      <div className="title flex justify-between items-center mt-10 mb-12 pl-[5px] bg-white">
        <h3 className='text-[#4F4F4F] font-medium text-[28px]'>Projects</h3>
        <button className='bg-[#EF9B28] text-white py-[10px] pl-[52px] pr-[14px] rounded-[32px] text-center '><span className='mr-2'>+</span> Add New Project</button>
      </div >
      <div className="relative overflow-x-auto shadow-xl sm:rounded-lg mb-10">
        <div className='w-full bg-white relative'>
          <input type="search" placeholder='Search here' className=' shadow-2xl pl-10 py-2 focus:outline-none ml-4 my-5 border-[.7px] rounded-[24px]' />
          <IoIosSearch className='absolute left-8 bottom-8' />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-[#315951E5] dark:[#315951E5] dark:text-white ">
            <tr className=''>
              <th scope="col" className="px-6 py-4 border-r-[1px] border-black relative">
                Title
                <BiExpandVertical className='absolute top-4 left-24 text-[15px]' />
              </th>
              <th scope="col" className="px-6 py-3 border-r-[1px] border-black relative">
                Statues
                <BiExpandVertical className='absolute top-4 left-24 text-[15px]' />
              </th>
              <th scope="col" className="px-6 py-3 border-r-[1px] border-black relative">
                Num Users
                <BiExpandVertical className='absolute left-28 top-4 text-[15px]' />
              </th>
              <th scope="col" className="px-6 py-3 border-r-[1px] border-black relative text-[14px]">
                Num Tasks
                <BiExpandVertical className='absolute left-32 top-4 text-[15px]' />
              </th>
              <th scope="col" className="px-6 py-3 relative border-r-[1px] border-white">
                Date Created
                <BiExpandVertical className='absolute top-4 left-32 text-[15px] text-center' />
              </th>
              <th scope="col" className="px-6 py-3 relative w-[1%]">
                Actons
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-white ">
              <th scope="row" className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap dark:text-[#4F4F4F]">
                Food Management
              </th>
              <td className="px-6 py-4">
                <a href="" className='bg-[#315951E5] text-white py-[6px] px-[14px] rounded-[16px]'>Public</a>
              </td>
              <td className="px-6 py-4 text-[#4F4F4F]">
                10
              </td>
              <td className="px-6 py-4">
                30
              </td>
              <td className="px-6 py-4">
                09-23-2023
              </td>
              <td className="px-6 py-4">
                <BsThreeDotsVertical className='text-black' />
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-[#F5F5F5] even:bg-gray-50 even:dark:bg-[#F5F5F5] ">
              <th scope="row" className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap dark:text-[#4F4F4F]">
                Food Management
              </th>
              <td className="px-6 py-4">
                <a href="" className='bg-[#315951E5] text-white py-[6px] px-[14px] rounded-[16px]'>Public</a>
              </td>
              <td className="px-6 py-4 text-[#4F4F4F]">
                10
              </td>
              <td className="px-6 py-4">
                30
              </td>
              <td className="px-6 py-4">
                09-23-2023
              </td>
              <td className="px-6 py-4">
                <BsThreeDotsVertical className='text-black' />
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-white ">
              <th scope="row" className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap dark:text-[#4F4F4F]">
                Food Management
              </th>
              <td className="px-6 py-4">
                <a href="" className='bg-[#315951E5] text-white py-[6px] px-[14px] rounded-[16px]'>Public</a>
              </td>
              <td className="px-6 py-4 text-[#4F4F4F]">
                10
              </td>
              <td className="px-6 py-4">
                30
              </td>
              <td className="px-6 py-4">
                09-23-2023
              </td>
              <td className="px-6 py-4">
                <BsThreeDotsVertical className='text-black' />
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-[#F5F5F5] even:bg-gray-50 even:dark:bg-[#F5F5F5] ">
              <th scope="row" className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap dark:text-[#4F4F4F]">
                Food Management
              </th>
              <td className="px-6 py-4">
                <a href="" className='bg-[#315951E5] text-white py-[6px] px-[14px] rounded-[16px]'>Public</a>
              </td>
              <td className="px-6 py-4 text-[#4F4F4F]">
                10
              </td>
              <td className="px-6 py-4">
                30
              </td>
              <td className="px-6 py-4">
                09-23-2023
              </td>
              <td className="px-6 py-4">
                <BsThreeDotsVertical className='text-black' />
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-white ">
              <th scope="row" className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap dark:text-[#4F4F4F]">
                Food Management
              </th>
              <td className="px-6 py-4">
                <a href="" className='bg-[#315951E5] text-white py-[6px] px-[14px] rounded-[16px]'>Public</a>
              </td>
              <td className="px-6 py-4 text-[#4F4F4F]">
                10
              </td>
              <td className="px-6 py-4">
                30
              </td>
              <td className="px-6 py-4">
                09-23-2023
              </td>
              <td className="px-6 py-4">
                <BsThreeDotsVertical className='text-black' />
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-[#F5F5F5] even:bg-gray-50 even:dark:bg-[#F5F5F5] ">
              <th scope="row" className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap dark:text-[#4F4F4F]">
                Food Management
              </th>
              <td className="px-6 py-4">
                <a href="" className='bg-[#315951E5] text-white py-[6px] px-[14px] rounded-[16px]'>Public</a>
              </td>
              <td className="px-6 py-4 text-[#4F4F4F]">
                10
              </td>
              <td className="px-6 py-4">
                30
              </td>
              <td className="px-6 py-4">
                09-23-2023
              </td>
              <td className="px-6 py-4">
                <BsThreeDotsVertical className='text-black' />
              </td>
            </tr>
          </tbody>
        </table>
            <div className='py-8  flex justify-end items-center gap-5  w-full'>
                <div className='flex justify-between items-center gap-4'>
                <span className='text-[#4F4F4F]'>Showing</span>
                <select name="" id="" className='border-[1px] rounded-[24px] p-2'>
                  <option value="" className='text-[#4F4F4F]'>10</option>
                  <option value="" className='text-[#4F4F4F]'>9</option>
                  <option value="" className='text-[#4F4F4F]'>8</option>
                  <option value="" className='text-[#4F4F4F]'>7</option>
                  <option value="" className='text-[#4F4F4F]'>6</option>
                </select>
                <span className='text-[#4F4F4F]'>of 102 Results</span>
                </div>

                <div className='flex justify-end items-center mr-5'>
                  <span className='text-[#4F4F4F] mr-3'>Page 1 of 10</span>
                  <div className='flex gap-5'>
                  <FaChevronLeft className='text-[#4F4F4F]'/>
                  <FaChevronRight className='text-[#4F4F4F]'/>
                  </div>
                </div>
            </div>
      </div>
    </>

  )
}
