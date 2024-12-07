import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { BiExpandVertical } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import {
  axiosInstance,
  USERS_URLS,

} from '../../../../services/apisUrls/apisUrls';
interface project{
  creationDate:string,
  description:string,
  id:number,
  modificationDate:string,
  title:string
}
interface task{
  creationDate:string,
  description:string,
  id:number,
  modificationDate:string,
  project:project,
  status:string,
  title:string
}
interface UserResponse{
  country:string,
  email:string,
  id:number,
  imagePath:string,
  isActivated:boolean,
  phoneNumber:string,
  task:task
}

export default function UsersList() {
  const [users, setUsers] = useState([]);

  const allUsers = async () => {
    try {
      const response = await axiosInstance.get<UserResponse>(
        USERS_URLS.GET_UsersUrls
      );
      console.log(response.data.data);
      
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const changeUserStatus = async(id:number)=>{
    try {
      let response =await axiosInstance.put(USERS_URLS.TOGGLE_STATUS_URLS(id))
      console.log(response);
      
    allUsers()
    } catch (error) {
      console.log(error)
    }
    
  }
  const usersFilter=(input: React.ChangeEvent<HTMLInputElement>)=>{
   allUsers(1,3,input.target.value);
    
  }
  
  useEffect(() => {
    allUsers();
  }, []);
  return <>
     <h3 className="text-[#4F4F4F] font-medium text-[28px]">Users</h3>
   <div className="w-full bg-white relative">
            <input
              type="search"
              placeholder="Search here"
              className="shadow-2xl pl-10 py-2 focus:outline-none ml-4 my-5 border-[.7px] rounded-[24px]"
              onChange={usersFilter}
            />
            <IoIosSearch className="absolute left-8 bottom-8" />
          </div>
          <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
          <table className=" text-sm text-left  w-full ">
            <thead className=" uppercase bg-[#315951E5] text-white ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px]"
                >
                  <div className="flex items-center gap-6">
                    User Name
                    <BiExpandVertical className="text-base" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6">
                    Status
                    <BiExpandVertical className="text-base" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6">
                    Phone Number
                    <BiExpandVertical className="text-base" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6">
                    Email
                    <BiExpandVertical className="text-base" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6"></div>
                </th>
              </tr>
            </thead>
            {users.length > 0 ? (
              <tbody>
                {users.map((user:any) => (
                  <tr className=" even:bg-[#F5F5F5]" key={user.id}>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap"
                    >
                      {user.userName}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap"
                    >
                      {user.isActivated?<span className='bg-red-700 text-[#F5F5F5] p-3 rounded-lg rounded px-10'>Not Active</span>:<span className='bg-green-700 rounded-lg px-10 rounded text-[#F5F5F5] p-3'>Active</span>}
                     
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap"
                    >
                      {user.phoneNumber}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap"
                    >
                      {user.email}
                    </td>

                    <td
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap flex gap-5 "
                    >
                    {user.isActivated?(
                      <i className="fa-solid fa-toggle-off fa-2xl" onClick={()=>changeUserStatus(user.id)}></i>)
                      :(<i className="fa fa-toggle-on fa-2xl " onClick={()=>changeUserStatus(user.id)} aria-hidden="true"></i>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <span className="text-4xl">no data</span>
            )}
            </table>
            <div className="py-8 flex justify-end items-center gap-5 w-full">
            <div className="flex justify-between items-center gap-4">
              <span className="text-[#4F4F4F]">Showing</span>
              <select name="" id="" className="border-[1px] rounded-[24px] p-2">
                <option value="" className="text-[#4F4F4F]">
                  10
                </option>
                <option value="" className="text-[#4F4F4F]">
                  9
                </option>
                <option value="" className="text-[#4F4F4F]">
                  8
                </option>
                <option value="" className="text-[#4F4F4F]">
                  7
                </option>
                <option value="" className="text-[#4F4F4F]">
                  6
                </option>
              </select>
              <span className="text-[#4F4F4F]">of 102 Results</span>
            </div>

            <div className="flex justify-end items-center mr-5">
              <span className="text-[#4F4F4F] mr-3">Page 1 of 10</span>
              <div className="flex gap-5">
                <FaChevronLeft className="text-[#4F4F4F]" />
                <FaChevronRight className="text-[#4F4F4F]" />
              </div>
            </div>
          </div>
          </div>
   
  </>
}
