import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  axiosInstance,
  TASKSUSER_URLS,
} from '../../../../services/apisUrls/apisUrls';
type Status = 'ToDo' | 'InProgress' | 'Done';
interface TaskAsigned {
  id: number;
  title: string;
  description: string;
  status: Status;
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

  const getAllAssignedTasks = async (pageNumber: number=1, pageSize: number=20) => {
    try {
      const response = await axiosInstance.get<DataTaskAsignedResponse>(
        TASKSUSER_URLS.GET_TASKSUSER,
        { params: { pageNumber, pageSize } },
      );
      console.log(response);
      setTasksAssigned(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAssignedTasks(1, 20);
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
          <Column
            setTasksAssigned={setTasksAssigned}
            refetchTasks={getAllAssignedTasks}
            title="ToDo"
            tasks={tasksToDo}
          />
          <Column
            setTasksAssigned={setTasksAssigned}
            refetchTasks={getAllAssignedTasks}
            title="InProgress"
            tasks={tasksInProgress}
          />
          <Column
            setTasksAssigned={setTasksAssigned}
            refetchTasks={getAllAssignedTasks}
            title="Done"
            tasks={tasksDone}
          />
        </div>
      </main>
    </>
  );
}
const Column = ({
  title,
  tasks,
  refetchTasks,
  setTasksAssigned,
}: {
  title: Status;
  tasks: TaskAsigned[];
  refetchTasks: () => Promise<void>;
  setTasksAssigned: React.Dispatch<React.SetStateAction<TaskAsigned[]>>;
}) => {
  const [background, setBackground] = useState('rgba(49, 89, 81, 0.9)');
  const changeStatus = async (id: string, status: string) => {
    try {
      const response = await axiosInstance.put(TASKSUSER_URLS.CHANGE_STATUS(id), {
        status,
      });
      await refetchTasks();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="md:col-span-2 col-span-6">
      <span className="block text-[#4F4F4F] capitalize text-xl mb-5 ">
        {title}
      </span>
      <motion.div
        layout={true}
        layoutId={title}
        key={title}
        className="  w-full h-full flex flex-col gap-5 pt-10 px-3 rounded-xl "
        style={{ backgroundColor: background }}
        onMouseEnter={() => setBackground('rgba(49, 89, 81, 1)')}
        onMouseLeave={() => setBackground('rgba(49, 89, 81, 0.9)')}
        onDrop={async (e) => {
          e.preventDefault();
          const id = e.dataTransfer.getData('taskId');
          const prevStatus = e.dataTransfer.getData('prevstatus');
          if (prevStatus != title) {
            setTasksAssigned((prevTasks) => {
              const newTask = prevTasks.map((task) => {
                if (task.id == +id) {
                  task.status = title;
                  return task;
                } else {
                  return task;
                }
              });
              return newTask;
            });
            await changeStatus(id, title);
            await refetchTasks();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        {tasks.map(({ id, title: taskTitle }) => (
          <motion.div
            layout={true}
            layoutId={id.toString()}
            draggable={true}
            className=" bg-[#EF9B28] capitalize text-[#FFFFFF] text-lg py-3 px-3 rounded-xl"
            key={id}
            onDragStart={(e) => {
              e.dataTransfer.setData('taskId', id.toString());
              e.dataTransfer.setData('prevStatus', title);
            }}
          >
            <span>{taskTitle}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
