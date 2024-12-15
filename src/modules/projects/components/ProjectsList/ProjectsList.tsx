// import React from 'react'
import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { BiExpandVertical } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import { BsPencil, BsThreeDotsVertical, BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import {
  axiosInstance,
  PROJECTS_URLS,
} from '../../../../services/apisUrls/apisUrls';
import DeleteConfirmation from '../../../shared/components/DeleteConfirmation/DeleteConfirmation';
import Loading from '../../../shared/components/Loading/Loading';
import NoData from '../../../shared/components/NoData/NoData';

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
  let { loginData } = useContext(AuthContext);

  /////////////////option select////////////////////
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const toggleOptions = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };
  /////////////////////////////////////////////////////
  const [projects, setProjects] = useState<DataResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //paganation

  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageSize = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
  };

  const handlePageNumber = (newPage) => {
    setPageNumber(newPage);
  };

  const allProjects = async (
    title?: string,
    pageSize: number = 10,
    pageNumber: number = 1,
  ) => {
    try {
      if (loginData?.userGroup == 'Manager') {
        const response = await axiosInstance.get<ProjectResponse>(
          PROJECTS_URLS.GET_PROJECTS,
          { params: { title, pageSize, pageNumber } },
        );
        console.log(response.data);
        setProjects(response?.data?.data);
        setTotalRecords(response.data.totalNumberOfRecords);
        setArrayOfPages(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1),
        );
      } else {
        const response = await axiosInstance.get<ProjectResponse>(
          PROJECTS_URLS.GET_PROJECTS_EMPIOYEE,
          { params: { title, pageSize, pageNumber } },
        );
        console.log(response.data);
        setProjects(response?.data?.data);
        setTotalRecords(response.data.totalNumberOfRecords);
        setArrayOfPages(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   allProjects(undefined, pageSize, pageNumber);
  // }, [pageSize, pageNumber]);

  useEffect(() => {
    // Check if loginData is available
    if (loginData) {
      allProjects(undefined, pageSize, pageNumber);
    } else {
      console.log('Waiting for login data...');
    }
  }, [loginData, pageSize, pageNumber]);

  const projectsFilter = (input: React.ChangeEvent<HTMLInputElement>) => {
    allProjects(input.target.value);
    // console.log(input.target.value);
  };

  const [projectId, setProjectId] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = (id: number) => {
    setProjectId(id);
    setIsModalOpen(true);
    // setIsModalOpen((prev) => !prev);
  };

  const deleteProject = async () => {
    try {
      const response = await axiosInstance.delete(
        PROJECTS_URLS.DELETE_PROJECT(projectId),
      );
      console.log(response);
      toast.success('delete successfully');
      setIsModalOpen(false);
      allProjects();
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <DeleteConfirmation
          deleteFun={deleteProject}
          showModal={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          title={'project'}
        />
      </div>

      <div>
        <div className="title flex justify-between shadow-sm px-6 py-4 mb-6">
          <h3 className="text-[#4F4F4F] font-medium text-[28px]">Projects</h3>
          {loginData?.userGroup == 'Manager' ? (
            <button
              className="bg-primary text-white rounded-2xl py-2 px-6 text-center flex items-center gap-3"
              onClick={() => navigate('/projects/new-project')}
            >
              <span>
                <FaPlus />
              </span>
              Add New Project
            </button>
          ) : (
            ''
          )}
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
                    {/* <BiExpandVertical className="text-base" /> */}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6">
                    Descripton
                    {/* <BiExpandVertical className="text-base" /> */}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6">
                    Tasks Number
                    {/* <BiExpandVertical className="text-base" /> */}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                >
                  <div className="flex items-center gap-6">
                    Date Created
                    {/* <BiExpandVertical className="text-base" /> */}
                  </div>
                </th>
                {loginData?.userGroup == 'Manager' ? (
                  <th
                    scope="col"
                    className="px-6 py-4 border-r-[1px] border-[#315951E5]  text-[14px] "
                  >
                    <div className="flex items-center gap-6"></div>
                  </th>
                ) : (
                  ''
                )}
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

                    {loginData?.userGroup == 'Manager' ? (
                      <td className="px-6 py-4 relative">
                        <BsThreeDotsVertical
                          className="text-black cursor-pointer"
                          onClick={() => toggleOptions(project.id)}
                        />
                        {selectedId === project.id && (
                          <div className="absolute bg-white border shadow-lg right-0 mr-2 mt-1 w-24 md:w-30 z-40">
                            <ul className="space-y-1">
                              <li>
                                <Link
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                  to={`/projects/${project.id}`}
                                >
                                  <BsPencil className="mr-2" /> Edit
                                </Link>
                              </li>
                              <li>
                                <button
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                  onClick={() => toggleModal(project.id)}
                                >
                                  <BsTrash className="mr-2" /> Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    ) : (
                      ''
                    )}
                  </tr>
                ))}
              </tbody>
            ) : (
              <NoData />
            )}
          </table>

          <div className="py-8 flex justify-end items-center gap-5 w-full">
            <div className="flex justify-between items-center gap-4">
              <span className="text-[#4F4F4F]">Showing</span>
              <select
                name=""
                id=""
                className="border-[1px] rounded-[24px] p-2"
                onChange={handlePageSize}
                value={pageSize}
              >
                {totalRecords > 15 ? (
                  <option value={15} className="text-[#4F4F4F]">
                    15
                  </option>
                ) : (
                  ''
                )}
                {totalRecords > 15 ? (
                  <option value={10} className="text-[#4F4F4F]">
                    10
                  </option>
                ) : (
                  ''
                )}
                {totalRecords > 5 ? (
                  <option value={5} className="text-[#4F4F4F]">
                    5
                  </option>
                ) : (
                  `${totalRecords}`
                )}
              </select>
              <span className="text-[#4F4F4F]">of {totalRecords} Results</span>
            </div>

            <div className="flex justify-end items-center mr-5">
              <span className="text-[#4F4F4F] mr-3">
                Page{pageNumber} of {arrayOfPages.length}
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
      </div>
    </>
  );
}
