import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEyeSlash, } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { axiosInstance,USERS_URLS,} from '../../../../services/apisUrls/apisUrls';
import {PASSWORD_VALIDATION,} from '../../../../services/validation/validation';
import { useState } from 'react';

interface ChangePassData {
 oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
}

export default function ChangePassword() {
  const [isPasswordVisable, setIsPasswordVisable] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: ChangePassData) => {
    // console.log(data);
    try {
      const response = await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD, data);
      toast.success(response?.data?.message || 'Change Password Successful');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Change Password failed');
    }
  };
  return (
    <>
      <div className="">
        <div className="my-10">
          <h6 className="text-white">welcome to PMS </h6>
          <h2 className="text-primary  font-bold text-3xl tracking-wide">
            <span className="capitalize border-b-4 border-primary">C</span>hange Password
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 relative">
            <label className="block text-primary ">Old Password</label>
            <input
              type={isPasswordVisable ? 'text' : 'password'}
              placeholder="old Password"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('oldPassword', PASSWORD_VALIDATION)}
            />

            <div className="absolute  right-2  top-[30px] text-white">
              <button
                type="button"
                onClick={() => setIsPasswordVisable((prev) => !prev)}
                className=" outline-none"
              >
                {isPasswordVisable ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors?.oldPassword && (
              <span className="text-red-500">{errors?.oldPassword?.message}</span>
            )}
          </div>
          <div className="mt-5 relative">
            <label className="block text-primary ">New Password</label>
            <input
              type={isPasswordVisable ? 'text' : 'password'}
              placeholder="New Password"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('newPassword', PASSWORD_VALIDATION)}
            />

            <div className="absolute  right-2  top-[30px] text-white">
              <button
                type="button"
                onClick={() => setIsPasswordVisable((prev) => !prev)}
                className=" outline-none"
              >
                {isPasswordVisable ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors?.newPassword && (
              <span className="text-red-500">{errors?.newPassword?.message}</span>
            )}
          </div>
          <div className="mt-5 relative">
            <label className="block text-primary ">Confirm New Password</label>
            <input
              type={isPasswordVisable ? 'text' : 'password'}
              placeholder="Confirm New Password"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('confirmNewPassword', PASSWORD_VALIDATION)}
            />

            <div className="absolute  right-2  top-[30px] text-white">
              <button
                type="button"
                onClick={() => setIsPasswordVisable((prev) => !prev)}
                className=" outline-none"
              >
                {isPasswordVisable ? <IoEyeOutline /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors?.confirmNewPassword && (
              <span className="text-red-500">{errors?.confirmNewPassword?.message}</span>
            )}
          </div>
          <div className="text-center py-8">
            <button
              className="text-white bg-primary hover:bg-primary_hover w-full rounded-3xl py-2 font-semibold tracking-wide flex justify-center items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                 Save ...
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
