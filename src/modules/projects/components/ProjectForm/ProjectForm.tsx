// import React from 'react'

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  axiosInstance,
  PROJECTS_URLS,
} from '../../../../services/apisUrls/apisUrls';
import { GetRequiredMessage } from '../../../../services/validation/validation';

interface ProjectFormData {
  title: string;
  description: string;
}
interface GetProjectByIdResponse {
  data: any;
  title: string;
  description: string;
}

export default function ProjectForm() {
  ////////////Update////////////
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProjectFormData>();

  useEffect(() => {
    if (params.projectId) {
      const getProjectByID = async () => {
        try {
          const response = await axiosInstance.get<GetProjectByIdResponse>(
            PROJECTS_URLS.GET_PROJECT(params.projectId),
          );
          console.log(response);

          setValue('title', response.data.title);
          setValue('description', response.data.description);
        } catch (error) {
          console.log(error);
        }
      };
      getProjectByID();
    }
  }, [params.projectId, setValue]);

  const onSubmit = async (data: ProjectFormData) => {
    try {
      const response = await axiosInstance[params.projectId ? 'put' : 'post'](
        params.projectId
          ? PROJECTS_URLS.UPDATE_PROJECT(params.projectId)
          : PROJECTS_URLS.CREATE_PROJECT,
        data,
      );
      console.log(response);

      params.projectId
        ? toast.success(response.data.message || 'Project Updated Successfully')
        : toast.success(response.data.message || 'Project Added Successfully');

      navigate('/projects');
      // setProjects(response.data.data);
    } catch (error) {
      toast.error('Project Not Added');
      console.log(error);
    }
  };

  const navigate = useNavigate();
  return (
    <>
      <div className=" shadow-sm px-6 py-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/projects')}
        >
          <MdKeyboardArrowLeft />
          <p className="text-sm text-muted tracking-wide capitalize text-[#0E382F] ">
            view all projects{' '}
          </p>
        </div>
        <h2 className="tracking-wide text-2xl capitalize font-semibold mt-2 text-[#0E382F]">
          {params.projectId ? 'Update Project' : 'add a new project'}
        </h2>
      </div>

      <div className="md:mx-24 md:my-10 shadow-2xl rounded-3xl">
        <form className="p-10 " onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-12">
            <div>
              <label className="block  capitalize mb-2 text-[#4F4F4F] tracking-wide text-lg">
                title
              </label>
              <input
                type="text"
                placeholder="Name"
                className="block w-full p-4  border  rounded-2xl  "
                {...register('title', {
                  required: GetRequiredMessage('Title'),
                })}
              />
              {errors?.title && (
                <span className="text-red-500">{errors?.title?.message}</span>
              )}
            </div>
          </div>
          <div>
            <div>
              <label className="block  capitalize mb-2 text-[#4F4F4F] tracking-wide text-lg">
                description
              </label>
              <input
                type="text"
                placeholder="Description"
                className="block w-full p-8  border  rounded-2xl  "
                {...register('description', {
                  required: GetRequiredMessage('Description'),
                })}
              />
            </div>
            {errors?.description && (
              <span className="text-red-500">
                {errors?.description?.message}
              </span>
            )}
          </div>
          <div className="border my-10 border-[#D9D9D9] "></div>

          <div className="flex justify-between items-center  ">
            <Link
              to={'/projects'}
              className="border md:px-8 px-4 py-3 text-black rounded-full border-black"
            >
              Cancel
            </Link>
            <button
              className="bg-primary hover:bg-primary_hover md:px-8 px-4 py-3  text-white rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saveing...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
