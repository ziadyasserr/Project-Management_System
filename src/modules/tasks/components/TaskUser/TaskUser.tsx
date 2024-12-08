import { useEffect, useState } from 'react';
import {
  axiosInstance,
  TASKSUSER_URLS,
} from '../../../../services/apisUrls/apisUrls';

interface TaskAsigned {
  id: number;
  title: string;
  description: string;
  status: 'ToDo' | 'InProgress' | 'Done';
}

interface DataTaskAsignedResponse {
  pageNumber: number;
  pageSize: number;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  data: TaskAsigned[];
}

export default function TaskUser() {
  const [tasksAssigned, setTasksAssigned] = useState<TaskAsigned[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get<DataTaskAsignedResponse>(
          TASKSUSER_URLS.GET_TASKSUSER,
        );
        console.log(response);
        setTasksAssigned(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const tasksToDo = tasksAssigned.filter(({ status }) => status == 'ToDo');

  const tasksInProgress = tasksAssigned.filter(
    ({ status }) => status == 'InProgress',
  );
  const tasksDone = tasksAssigned.filter(({ status }) => status == 'Done');

  return (
    <>
      <header>
        <div className="title flex justify-between shadow-sm px-6 py-4 mb-6">
          <h3 className="text-[#4F4F4F] font-medium text-[28px]">Task Board</h3>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-6 gap-20 md:gap-5">
          <Column title="to do" tasks={tasksToDo} />
          <Column title="to do" tasks={tasksInProgress} />
          <Column title="to do" tasks={tasksDone} />
        </div>
      </main>
    </>
  );
}
const Column = ({ title, tasks }: { title: string; tasks: TaskAsigned[] }) => {
  const [background, setBackground] = useState('rgba(49, 89, 81, 0.9)');

  return (
    <div className="md:col-span-2 col-span-6">
      <span className="block text-[#4F4F4F] capitalize text-xl mb-5 ">
        {title}
      </span>
      <div
        className="  w-full h-full flex flex-col gap-5 pt-10 px-3 rounded-xl "
        style={{ backgroundColor: background }}
        onMouseEnter={() => setBackground('rgba(49, 89, 81, 1)')}
        onMouseLeave={() => setBackground('rgba(49, 89, 81, 0.9)')}
      >
        {tasks.map(({ id, title }) => (
          <div
            className=" bg-[#EF9B28] capitalize text-[#FFFFFF] text-lg py-3 px-3 rounded-xl"
            key={id}
          >
            <span>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
