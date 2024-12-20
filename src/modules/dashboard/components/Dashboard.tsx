// import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { BsListTask } from 'react-icons/bs';
import { GiProgression } from 'react-icons/gi';
import { GoProjectSymlink } from 'react-icons/go';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import header from '../../../assets/header.png';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import {
  axiosInstance,
  TASKS_URLS,
  USERS_URLS,
} from '../../../services/apisUrls/apisUrls';
ChartJS.register(ArcElement, Tooltip, Legend);

interface UsersCount {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}
interface TasksCount {
  toDo: number;
  inProgress: number;
  done: number;
}

export default function Dashboard() {
  const { loginData } = useContext(AuthContext);
  const [userState, setUserState] = useState<UsersCount>({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  });

  const [taskState, setTaskState] = useState<TasksCount>({
    toDo: 0,
    inProgress: 0,
    done: 0,
  });

  // Pie chart data for tasks
  const tasksData = {
    labels: ['ToDo', 'InProgress', 'Done'],
    datasets: [
      {
        data: [taskState.toDo, taskState.inProgress, taskState.done],
        backgroundColor: ['#e6e7f5', '#f5f5e6', '#f5e6ee'],
        hoverBackgroundColor: ['#b5b6d1', '#c2c2a3', '#cbb4c0'],
      },
    ],
  };

  // Pie chart data for users
  const usersData = {
    labels: ['Activated', 'Deactivated'],
    datasets: [
      {
        data: [
          userState.activatedEmployeeCount,
          userState.deactivatedEmployeeCount,
        ],
        backgroundColor: ['#e6e7f5', '#f5f5e6'],
        hoverBackgroundColor: ['#b5b6d1', '#c2c2a3'],
      },
    ],
  };

  // Options for the charts
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribution',
      },
    },
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get<UsersCount>(
          USERS_URLS.COUNT_USERS,
        );
        console.log(response.data);
        setUserState(response.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const response = await axiosInstance.get<TasksCount>(
          TASKS_URLS.TASKS_COUNT,
        );
        console.log(response.data);
        setTaskState(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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

      <div className="grid md:grid-cols-8 grid-cols-2 mt-10 gap-10 mb-16 ">
        <div className="md:col-span-4 col-span-2 bg-[#F8F9FB] p-6 rounded-2xl ">
          <div className=" border-l-4  border-primary ">
            <span className="block font-semibold tracking-wide ms-5">
              Tasks
            </span>
            <span className="block text-gray-500 ms-5">
              Lorem ipsum dolor sit amet,consecteture
            </span>
          </div>

          <div className="mt-6 grid grid-cols-6 gap-5">
            <div className="md:col-span-2 col-span-3">
              <div className="bg-[#E5E6F4] rounded-xl  p-4">
                <GiProgression className="text-3xl   bg-[#CFD1EC] rounded-xl " />
                <span className="block text-[#6F7881] my-1">Tasks ToDo</span>
                <span className="block text-black text-lg tracking-wider">
                  {taskState.toDo}
                </span>
              </div>
            </div>
            <div className="md:col-span-2 col-span-3 ">
              <div className="bg-[#F4F4E5] rounded-xl  p-4">
                <BsListTask className="text-3xl   bg-[#E4E4BC] rounded-xl " />
                <span className="block text-[#6F7881] my-1">
                  Tasks Progress
                </span>
                <span className="block text-black text-lg tracking-wider">
                  {taskState.inProgress}
                </span>
              </div>
            </div>
            <div className="md:col-span-2 col-span-3 ">
              <div className="bg-[#F4E5ED] rounded-xl  p-4">
                <GoProjectSymlink className="text-3xl   bg-[#E7C3D7] rounded-xl " />
                <span className="block text-[#6F7881] my-1">Tasks Done</span>
                <span className="block text-black text-lg tracking-wider">
                  {taskState.done}
                </span>
              </div>
            </div>
          </div>

          <div className=" my-10 flex justify-center items-center w-full ">
            <div className="w-[300px] h-[300px] ">
              <Pie data={tasksData} options={options} />
            </div>
          </div>
        </div>

        {loginData?.userGroup == 'Manager' ? (
          <div className="md:col-span-4  col-span-2 bg-[#F8F9FB] p-6 rounded-2xl ">
            <div className="border-l-4  border-primary">
              <span className="block font-semibold tracking-wide ms-5">
                Users
              </span>
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
                    {userState.activatedEmployeeCount}
                  </span>
                </div>
              </div>
              <div className="md:col-span-2 col-span-3 ">
                <div className="bg-[#F4F4E5] rounded-xl  p-4">
                  <BsListTask className="text-3xl   bg-[#E4E4BC] rounded-xl " />
                  <span className="block text-[#6F7881] my-1">Inactive</span>
                  <span className="block text-black text-lg tracking-wider">
                    {userState.deactivatedEmployeeCount}
                  </span>
                </div>
              </div>
            </div>
            <div className=" my-10 flex justify-center items-center w-full ">
              <div className="w-[300px] h-[300px] ">
                <Pie data={usersData} options={options} />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
