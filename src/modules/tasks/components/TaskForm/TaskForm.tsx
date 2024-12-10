import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  axiosInstance,
  PROJECTS_URLS,
  TASKS_URLS,
  USERS_URLS,
} from '../../../../services/apisUrls/apisUrls';
import { GetRequiredMessage } from '../../../../services/validation/validation';
interface TaskData {
  id: number;
  title: string;
  description: string;
  userName?: string;
  projectId: number;
  employeeId: number;
}

interface Project {
  id: number;
  title: string;
}

interface User {
  id: number;
  userName: string;
}
export default function TaskForm() {
  const params = useParams();
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const navigate = useNavigate();
  const taskId = params.taskId;
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<TaskData>();

  useEffect(() => {
    if (taskId) {
      const getTaskByID = async () => {
        try {
          const response = await axiosInstance.get(
            TASKS_URLS.GET_TASK_BY_ID(taskId),
          );
          setValue('title', response.data.title);
          setValue('description', response.data.description);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };
      getTaskByID();
    }
  }, [taskId, setValue]);

  useEffect(() => {
    const allProjects = async (pageNumber: number, pageSize: number) => {
      try {
        const response = await axiosInstance.get(PROJECTS_URLS.GET_PROJECTS, {
          params: { pageNumber, pageSize },
        });
        setProjects(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const allUsers = async (pageNumber: number, pageSize: number) => {
      try {
        const response = await axiosInstance.get(USERS_URLS.GET_USERS, {
          params: { pageNumber, pageSize },
        });
        setTotalRecords(response.data.totalNumberOfRecords);
        setUsers(response.data.data);
        // console.log('zzzzzzzzzzz', response.data.totalNumberOfRecords);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    (async () => {
      await allUsers(1, 50);
      await allProjects(1, 50);
    })();
  }, []);

  const onSubmit = async (data: TaskData) => {
    try {
      const response = await axiosInstance[taskId ? 'put' : 'post'](
        taskId ? TASKS_URLS.UPDATE_TASK(taskId) : TASKS_URLS.ADD_TASK,
        data,
      );
      navigate('/tasks');
      toast.success(taskId ? 'Task updated' : 'Task added');
    } catch (error) {
      toast.error('Failed to save task');
      console.error('Submit error:', error);
    }
  };

  return (
    <>
      <div className="shadow-sm px-6 py-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/tasks')}
        >
          <MdKeyboardArrowLeft />
          <p className="text-sm tracking-wide capitalize text-[#0E382F]">
            view all tasks
          </p>
        </div>
        <h2 className="tracking-wide text-2xl capitalize font-semibold mt-2 text-[#0E382F]">
          {taskId ? 'Update Task' : 'Add a New Task'}
        </h2>
      </div>
      <div className="md:mx-24 md:my-10 shadow-2xl rounded-3xl">
        <form className="p-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block capitalize mb-2 text-[#4F4F4F] tracking-wide text-lg">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              className="block w-full p-4 border rounded-2xl"
              {...register('title', { required: GetRequiredMessage('Title') })}
            />
            {errors.title && (
              <span className="text-red-500">{errors.title.message}</span>
            )}
          </div>
          <div className="mb-6">
            <label className="block capitalize mb-2 text-[#4F4F4F] tracking-wide text-lg">
              Description
            </label>
            <input
              type="text"
              placeholder="Enter description"
              className="block w-full p-4 border rounded-2xl"
              {...register('description', {
                required: GetRequiredMessage('Description'),
              })}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="mb-2">User</label>
              <select
                {...register('employeeId', {
                  required: GetRequiredMessage('User'),
                })}
                className="p-4 w-full border rounded-2xl"
              >
                <option value="" disabled>
                  Select a user
                </option>

                {users.map(({ userName, id }) => (
                  <option value={id} key={id}>
                    {userName}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <span className="text-red-500">
                  {errors.employeeId.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Project</label>
              <select
                {...register('projectId', {
                  required: GetRequiredMessage('Project'),
                })}
                className="p-4 w-full border rounded-2xl"
              >
                <option value="" disabled>
                  Select a project
                </option>
                {projects.map(({ id, title }) => (
                  <option value={id} key={id}>
                    {title}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <span className="text-red-500">{errors.projectId.message}</span>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Link
              to="/projects"
              className="border md:px-8 px-4 py-3 text-black rounded-full border-black"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-[#0E382F] hover:bg-[#0E382F] md:px-8 px-4 py-3 text-white rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
