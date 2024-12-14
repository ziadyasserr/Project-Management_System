import { useEffect, useState } from "react";
import { BiExpandVertical } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsThreeDotsVertical, BsPencil, BsTrash, BsToggles, BsToggle2Off } from "react-icons/bs";
import {
  axiosInstance,
  USERS_URLS,
} from "../../../../services/apisUrls/apisUrls";
import { toast } from "react-toastify";

interface Project {
  creationDate: string;
  description: string;
  id: number;
  modificationDate: string;
  title: string;
}

interface Task {
  creationDate: string;
  description: string;
  id: number;
  modificationDate: string;
  project: Project;
  status: string;
  title: string;
}

interface UserResponse {
  country: string;
  email: string;
  id: number;
  imagePath: string;
  isActivated: boolean;
  phoneNumber: string;
  task: Task;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
}

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [arrayOfPages, setArrayOfPages] = useState<number[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const allUsers = async (pageNumber: number, pageSize: number) => {
    try {
      const response = await axiosInstance.get<UserResponse>(
        USERS_URLS.GET_UsersUrls,
        { params: { pageNumber, pageSize } }
      );
      setArrayOfPages(
        Array.from({ length: response.data.totalNumberOfPages }, (_, i) => i + 1)
      );
      setUsers(response.data.data);
      setTotalRecords(response.data.totalNumberOfRecords);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error("Failed to fetch users");
    }
  };

  const changeUserStatus = async (id: number) => {
    try {
      const response = await axiosInstance.put(USERS_URLS.TOGGLE_STATUS_URLS(id));
      allUsers(pageNumber, pageSize);
      setSelectedId(null); // Hide dropdown after action
    } catch (error) {
      console.error('Failed to change user status:', error);
    }
  };

  const toggleOptions = (id: number) => {
    setSelectedId(selectedId === id ? null : id);
  };

  useEffect(() => {
    allUsers(pageNumber, pageSize);
  }, [pageNumber, pageSize]);

  return (
    <>
      <h3 className="text-[#4F4F4F] font-medium text-[28px]">Users</h3>
      <div className="relative overflow-x-auto shadow-xl sm:rounded-lg mt-8">
        <table className="text-sm text-left w-full">
          <thead className="uppercase bg-[#315951E5] text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 border-r-[1px] border-[#315951E5] text-[14px]"
              >
                <div className="flex items-center gap-6">
                  User Name
                  <BiExpandVertical className="text-base" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 border-r-[1px] border-[#315951E5] text-[14px] "
              >
                <div className="flex items-center gap-6">
                  Status
                  <BiExpandVertical className="text-base" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 border-r-[1px] border-[#315951E5] text-[14px] "
              >
                <div className="flex items-center gap-6">
                  Phone Number
                  <BiExpandVertical className="text-base" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 border-r-[1px] border-[#315951E5] text-[14px] "
              >
                <div className="flex items-center gap-6">
                  Email
                  <BiExpandVertical className="text-base" />
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 border-r-[1px] border-[#315951E5] text-[14px] "
              >
                <div className="flex items-center gap-6">
                  Actions
                  <BiExpandVertical className="text-base" />
                </div>
              </th>
            </tr>
          </thead>
          {users.length > 0 ? (
            <tbody>
              {users.map((user: any) => (
                <tr className="even:bg-[#F5F5F5]" key={user.id}>
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
                    {user.isActivated ? (
                      <span className="bg-green-700 px-10 rounded text-[#F5F5F5] p-3">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-700 text-[#F5F5F5] p-3 rounded px-10 w-5">
                        Not Active
                      </span>
                    )}
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
                  <td className="px-6 py-4 relative">
                    <BsThreeDotsVertical
                      className="text-black cursor-pointer"
                      onClick={() => toggleOptions(user.id)}
                    />
                    {selectedId === user.id && (
                      <div className="absolute bg-white border shadow-lg right-0 mr-2 mt-1 w-24 md:w-30 z-40">
                        <ul className="space-y-1">
                          <li>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                              onClick={() => changeUserStatus(user.id)}
                            >
                              {user.isActivated ? 'Deactivate' : 'Activate'}
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
            <tr>
              <td colSpan={5} className="text-center text-4xl">
                No data
              </td>
            </tr>
          )}
        </table>
        <div className="py-8 flex justify-end items-center gap-5 w-full">
          <div className="flex justify-between items-center gap-4">
            <span className="text-[#4F4F4F]">Showing</span>
            <select
              name="pageSize"
              id="pageSizeSelect"
              className="border-[1px] rounded-[24px] p-2"
              onChange={(event) => setPageSize(parseInt(event.target.value, 10))}
              value={pageSize}
            >
              {[15, 10, 5, 4].map((size) => (
                <option key={size} value={size} className="text-[#4F4F4F]">
                  {size}
                </option>
              ))}
            </select>
            <span className="text-[#4F4F4F]">of {totalRecords} Results</span>
          </div>
          <div className="flex justify-end items-center mr-5">
            <span className="text-[#4F4F4F] mr-3">
              Page {pageNumber} of {arrayOfPages.length}
            </span>
            <div className="flex gap-5">
              <button
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber === 1}
              >
                <FaChevronLeft className="text-[#4F4F4F]" />
              </button>
              <button
                onClick={() => setPageNumber(Math.min(arrayOfPages.length, pageNumber + 1))}
                disabled={pageNumber === arrayOfPages.length}
              >
                <FaChevronRight className = "text-[#4F4F4F]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
