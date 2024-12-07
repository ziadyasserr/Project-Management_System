import { useEffect, useState } from "react";
import { BsThreeDotsVertical, BsEye, BsPencil, BsTrash } from "react-icons/bs";
import {  FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { axiosInstance, TASKS_URLS } from "../../../../services/apisUrls/apisUrls";
import { format } from "date-fns";

interface DataResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  project: {
    title: string;
    description: string;
    creationDate: string;
  };
  employee: {
    userName: string;
  };
}

export default function TasksList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<DataResponse[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const toggleOptions = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null); 
    } else {
      setSelectedId(id); 
    }
  };

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(TASKS_URLS.GET_TASKS_MANAGER);
      setTasks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div>
      <div className="title flex justify-between shadow-sm px-6 py-4 mb-6">
        <h3 className="text-[#4F4F4F] font-medium text-2xl">Tasks</h3>
        <button
          className="bg-primary text-white rounded-2xl py-2 px-6 flex items-center gap-3"
          onClick={() => navigate("/task/new-task")}
        >
          <FaPlus />
          Add New Task
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
        <div className="w-full bg-white relative">
          <input
            type="search"
            placeholder="Search here"
            className="shadow-2xl pl-10 py-2 focus:outline-none ml-4 my-5 border rounded-2xl"
          />
          <IoIosSearch className="absolute left-8 bottom-8" />
        </div>
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs uppercase bg-[#315951E5] text-white">
            <tr>
              <th scope="col" className="px-6 py-4 border-r-[1px] border-black">Title</th>
              <th scope="col" className="px-6 py-3 border-r-[1px] border-black">Status</th>
              <th scope="col" className="px-6 py-3 border-r-[1px] border-black">User</th>
              <th scope="col" className="px-6 py-3 border-r-[1px] border-black">Project</th>
              <th scope="col" className="px-6 py-3 border-r-[1px] border-black">Date Created</th>
              <th scope="col" className="px-6 py-3 w-[1%]"></th>
            </tr>
          </thead>
          {tasks.length > 0 ? (
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="bg-white dark:bg-white even:bg-gray-50 dark:even:bg-white">
                  <td className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap">{task.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-[#315951E5] text-white py-2 px-4 rounded-full">{task.status}</span>
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">{task.employee.userName}</td>
                  <td className="px-6 py-4">{task.project.title}</td>
                  <td className="px-6 py-4">{format(new Date(task.creationDate), "yyyy-MM-dd")}</td>
                  <td className="px-6 py-4 relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleOptions(task.id)}
                    />
                    {selectedId === task.id && (
                      <div className="absolute bg-white border shadow-lg right-0 mr-2 mt-1 w-24 md:w-30 z-40">
                        <ul className="space-y-1">
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                            >
                              <BsEye className="mr-2" /> View
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                              onClick={() => navigate(`/task/${task.id}`)}
                            >
                              <BsPencil className="mr-2" /> Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                            >
                              <BsTrash className="mr-2" /> Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-3">No data</td>
              </tr>
            </tbody>
          )}
        </table>
        <div className="py-8 flex justify-end items-center gap-5 w-full">
        </div>
      </div>
    </div>
  );
}
