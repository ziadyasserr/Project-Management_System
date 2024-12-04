import { useEffect, useState } from 'react';
import { BiExpandVertical } from 'react-icons/bi';
import { BsEye, BsPencil, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import {
  axiosInstance,
  TASKS_URLS,
} from '../../../../services/apisUrls/apisUrls';
// import { useNavigate } from 'react-router-dom';

interface TasksResponse {
  data: any;
  message: string;
}

export default function TasksList() {
  const [showOptions, setShowOptions] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const allTasks = async () => {
    const response = await axiosInstance.get<TasksResponse>(
      TASKS_URLS.GET_TASKS,
    );
    console.log(response.data.data);
    setTasks(response.data.data);
  };
  useEffect(() => {
    allTasks();
  }, []);

  // const navigate = useNavigate();
  return (
    <div>
      <div className="title flex justify-between  shadow-sm px-6 py-4 mb-6">
        <h3 className="text-[#4F4F4F] font-medium text-[28px]">Task</h3>
        <button
          className="bg-primary text-white  rounded-2xl py-2 px-6 text-center flex items-center gap-3"
          // onClick={() => navigate('/project-form')}
        >
          <span className="">
            <FaPlus />
          </span>
          Add New Task
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
        <div className="w-full bg-white relative">
          <input
            type="search"
            placeholder="Search here"
            className=" shadow-2xl pl-10 py-2 focus:outline-none ml-4 my-5 border-[.7px] rounded-[24px]"
          />
          <IoIosSearch className="absolute left-8 bottom-8" />
        </div>
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs  uppercase bg-[#315951E5]  text-white ">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 border-r-[1px] border-black relative"
              >
                Title
                <BiExpandVertical className="absolute top-4 left-24 text-[15px]" />
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-r-[1px] border-black relative"
              >
                Statues
                <BiExpandVertical className="absolute top-4 left-24 text-[15px]" />
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-r-[1px] border-black relative"
              >
                User
                <BiExpandVertical className="absolute left-28 top-4 text-[15px]" />
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-r-[1px] border-black relative text-[14px]"
              >
                Project
                <BiExpandVertical className="absolute left-32 top-4 text-[15px]" />
              </th>
              <th
                scope="col"
                className="px-6 py-3 relative border-r-[1px] border-white"
              >
                Date Created
                <BiExpandVertical className="absolute top-4 left-32 text-[15px] text-center" />
              </th>
              <th scope="col" className="px-6 py-3 relative w-[1%]"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-white ">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap dark:text-[#4F4F4F]"
              >
                Food Management
              </td>
              <td className="px-6 py-4">
                <a
                  href=""
                  className="bg-[#315951E5] text-white py-[6px] px-[18px] tracking-wide rounded-[16px]"
                >
                  Public
                </a>
              </td>
              <td className="px-6 py-4 text-[#4F4F4F]">10</td>
              <td className="px-6 py-4">30</td>
              <td className="px-6 py-4">09-23-2023</td>
              <td className="px-6 py-4 relative ">
                <BsThreeDotsVertical
                  className="text-black cursor-pointer"
                  onClick={handleClick}
                />
                {showOptions && (
                  <div className="absolute bg-white border shadow-lg right-0 mr-2 mt-1 w-24 md:w-30">
                    <ul className="space-y-1">
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                          <BsEye className="mr-2 text-[#0E382F]" />
                          View
                        </button>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                          <BsPencil className="mr-2 text-[#0E382F]" />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                          <BsTrash className="mr-2 text-[#0E382F]" />
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="py-8  flex justify-end items-center gap-5  w-full">
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
    </div>
  );
}
