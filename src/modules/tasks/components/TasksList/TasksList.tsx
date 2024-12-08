import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { BsEye, BsPencil, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import noDataPhoto from '../../../../assets/nodatafound.png';
import {
  axiosInstance,
  TASKS_URLS,
} from '../../../../services/apisUrls/apisUrls';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';

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
  const [nameValue, setNameValue] = useState('');
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [taskId, setTaskId] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleOptions = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  const getAllTasks = async (
    title: string,
    pageNumber: number,
    pageSize: number,
  ) => {
    try {
      const response = await axiosInstance.get(TASKS_URLS.GET_TASKS_MANAGER, {
        params: { title: title, pageNumber: pageNumber, pageSize: pageSize },
      });
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1),
      );
      setTasks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axiosInstance.delete(
        TASKS_URLS.DELETE_TASK(taskId),
      );
      console.log(response);
      setIsModalOpen(false);
      getAllTasks(nameValue, pageNumber, pageSize);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleModal = (id: number) => {
    setTaskId(id);
    setIsModalOpen(true);
  };

  const getNameValue = (input: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(input.target.value);
    getAllTasks(input.target.value, pageNumber, pageSize);
  };

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
  };

  const handlePageNumber = (newPage: any) => {
    setPageNumber(newPage);
  };

  useEffect(() => {
    getAllTasks(nameValue, pageNumber, pageSize);
  }, [nameValue, pageNumber, pageSize]);

  return (
    <div>
      <div>
        <DeleteConfirmation
          deleteFun={deleteTask}
          showModal={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          title="Task"
        />
      </div>
      <div className="title flex justify-between shadow-sm px-6 py-4 mb-6">
        <h3 className="text-[#4F4F4F] font-medium text-2xl">Tasks</h3>
        <button
          className="bg-primary text-white rounded-2xl py-2 px-6 flex items-center gap-3"
          onClick={() => navigate('/task/new-task')}
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
            onChange={getNameValue}
          />
          <IoIosSearch className="absolute left-8 bottom-8" />
        </div>
        {tasks.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs uppercase bg-[#315951E5] text-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-black"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-[1px] border-black"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-[1px] border-black"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-[1px] border-black"
                >
                  Project
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 border-r-[1px] border-black"
                >
                  Date Created
                </th>
                <th scope="col" className="px-6 py-3 w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="bg-white dark:bg-white even:bg-gray-50 dark:even:bg-white"
                >
                  <td className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap">
                    {task.title}
                  </td>
                  <td className="px-6 py-4">
                    {task.status == 'ToDo' ? (
                      <span className="bg-[#E4E1F5] text-white py-2 px-4 rounded-full">
                        {task.status}
                      </span>
                    ) : task.status == 'InProgress' ? (
                      <span className="bg-[#EF9B28A3] text-white py-2 px-4 rounded-full">
                        {task.status}
                      </span>
                    ) : (
                      <span className="bg-[#009247] text-white py-2 px-4 rounded-full">
                        {task.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[#4F4F4F]">
                    {task.employee.userName}
                  </td>
                  <td className="px-6 py-4">{task.project.title}</td>
                  <td className="px-6 py-4">
                    {format(new Date(task.creationDate), 'yyyy-MM-dd')}
                  </td>
                  <td className="px-6 py-4 relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleOptions(task.id)}
                    />
                    {selectedId === task.id && (
                      <div className="absolute bg-white border shadow-lg right-0 mr-2 mt-1 w-24 md:w-30 z-40">
                        <ul className="space-y-1">
                          <li>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
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
                              onClick={() => toggleModal(task.id)}
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
          </table>
        ) : (
          <img
            src={noDataPhoto}
            alt=""
            className="w-[450px] h-[250px] text-center flex justify-center items-center mx-auto"
          />
        )}
        <div className="py-8 flex justify-end items-center gap-5 w-full"></div>
      </div>

      <div className="py-8 flex justify-end items-center gap-5 w-full">
        <div className="flex justify-between items-center gap-4">
          <span className="text-[#4F4F4F]">Showing</span>
          <select
            name="pageSize"
            id="pageSizeSelect"
            className="border-[1px] rounded-[24px] p-2"
            onChange={handlePageSize}
            value={pageSize}
          >
            <option value={15} className="text-[#4F4F4F]">
              15
            </option>
            <option value={10} className="text-[#4F4F4F]">
              10
            </option>
            <option value={5} className="text-[#4F4F4F]">
              5
            </option>
            <option value={4} className="text-[#4F4F4F]">
              4
            </option>
          </select>
          <span className="text-[#4F4F4F]">of {tasks.length} Results</span>
        </div>

        <div className="flex justify-end items-center mr-5">
          <span className="text-[#4F4F4F] mr-3">
            Page {pageNumber} of {arrayOfPages.length}
          </span>
          <div className="flex gap-5">
            <button
              onClick={() => {
                handlePageNumber(pageNumber - 1);
              }}
              disabled={pageNumber === 1}
            >
              <FaChevronLeft className="text-[#4F4F4F]" />
            </button>
            <button
              onClick={() => {
                handlePageNumber(pageNumber + 1);
              }}
              disabled={pageNumber === arrayOfPages.length}
            >
              <FaChevronRight className="text-[#4F4F4F]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
