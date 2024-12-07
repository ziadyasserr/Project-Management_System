// import React from 'react'
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { BiExpandVertical } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import {
  axiosInstance,
  PROJECTS_URLS,
} from '../../../../services/apisUrls/apisUrls';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
}

interface DataResponse {
  id: number;
  description: string;
  title: string;
  creationDate: string;
  task: Task[];
}

interface ProjectResponse {
  data: DataResponse[];
  pageNumber: number;
  pageSize: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export default function ProjectsList() {
  const navigate = useNavigate();
  // const [showOptions, setShowOptions] = useState<number | null>(null); // Track which menu is open

  // const handleClick = (id: number) => {
  //   setShowOptions((prev) => (prev === id ? null : id)); // Toggle menu for the specific project
  // };
  const [projects, setProjects] = useState<DataResponse[]>([]);

  const allProjects = async (title?: string) => {
    try {
      const response = await axiosInstance.get<ProjectResponse>(
        PROJECTS_URLS.GET_PROJECTS,
        { params: { title } },
      );
      console.log(response.data.data);
      setProjects(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    allProjects();
  }, []);

  const projectsFilter = (input: React.ChangeEvent<HTMLInputElement>) => {
    allProjects(input.target.value);
    // console.log(input.target.value);
  };

  return (
    <>
      <div>
        <div className="title flex justify-between shadow-sm px-6 py-4 mb-6">
          <h3 className="text-[#4F4F4F] font-medium text-[28px]">Projects</h3>
          <button
            className="bg-primary text-white rounded-2xl py-2 px-6 text-center flex items-center gap-3"
            onClick={() => navigate('/projects/new-project')}
          >
            <span>
              <FaPlus />
            </span>
            Add New Project
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
          <div className="w-full bg-white relative">
            <input
              type="search"
              placeholder="Search here"
              className="shadow-2xl pl-10 py-2 focus:outline-none ml-4 my-5 border-[.7px] rounded-[24px]"
              onChange={projectsFilter}
            />
            <IoIosSearch className="absolute left-8 bottom-8" />
          </div>

          <table className=" text-sm text-left  w-full ">
            <thead className=" uppercase bg-[#315951E5] text-white ">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px]"
                >
                  <div className="flex items-center gap-6">
                    Title
                    <BiExpandVertical className="text-base" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6">
                    Descripton
                    <BiExpandVertical className="text-base" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6">
                    Tasks Number
                    <BiExpandVertical className="text-base" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6">
                    Date Created
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

            {projects.length > 0 ? (
              <tbody>
                {projects.map((project: DataResponse) => (
                  <tr className=" even:bg-[#F5F5F5]" key={project.id}>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap"
                    >
                      {project.title}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap"
                    >
                      {project.description}
                      ..
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap"
                    >
                      {project.task.length > 0
                        ? project.task.length
                        : 'No tasks'}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-[#4F4F4F] whitespace-nowrap"
                    >
                      {format(new Date(project.creationDate), 'yyyy-MM-dd')}
                    </td>

                    <td
                      scope="row"
                      className="px-6 py-4 font-medium  whitespace-nowrap flex gap-5 text-white"
                    >
                      <button
                        className=" bg-red-400"
                        onClick={() => navigate('/projects/new-project')}
                      >
                        {' '}
                        add
                      </button>
                      <button
                        className=" bg-red-800"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        update
                      </button>
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
      </div>
    </>
  );
}
