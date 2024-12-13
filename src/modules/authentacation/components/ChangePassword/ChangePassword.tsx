import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEyeSlash, FaSpinner } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  axiosInstance,
  USERS_URLS,
} from '../../../../services/apisUrls/apisUrls';
import { PASSWORD_VALIDATION } from '../../../../services/validation/validation';

interface formData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePassword() {
  const [isPasswordVisable, setIsPasswordVisable] = useState(false);
  const [isOldPasswordVisable, setIsOldPasswordVisable] = useState(false);
  const [isConfirmPasswordVisable, setIsConfirmPasswordVisable] =
    useState(false);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm<formData>();

  const onSubmit = async (data: formData) => {
    try {
      let response = await axiosInstance.put(USERS_URLS.CHANGE_PASSWORD, data);
      console.log(response);
      navigate('/login');
      toast.success(response.data.message || 'password updated succeffully');
    } catch (error) {
      console.log(error);
      toast.error(
        error.response.data.message || 'Failed to update your password',
      );
    }
  };
  return (
    <div>
      <div className="my-10">
        <h6 className="text-white">Welcome to PMS</h6>
        <h2 className="text-primary font-bold text-3xl tracking-wide">
          <span className="capitalize border-b-4 border-primary">C</span>hange
          password
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <label className="block text-primary ">
            Old Password <span className="sr-only">Required</span>
          </label>
          <input
            type={isOldPasswordVisable ? 'text' : 'password'}
            placeholder="Enter your Old Password"
            className="bg-inherit placeholder-gray-400 pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
            {...register('oldPassword', { required: 'Type your old password' })}
          />
          <div className="absolute  right-2  top-[30px] text-white">
            <button
              type="button"
              onClick={() => setIsOldPasswordVisable((prev) => !prev)}
              className=" outline-none"
            >
              {isOldPasswordVisable ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        {errors.oldPassword && (
          <span className="text-red-600 my-3">
            {errors.oldPassword.message}
          </span>
        )}
        <div className=" my-5">
          <div className="relative">
            <label className="block text-primary ">
              New Password <span className="sr-only">Required</span>
            </label>
            <input
              type={isPasswordVisable ? 'text' : 'password'}
              placeholder="Enter your New Password"
              className="bg-inherit placeholder-gray-400 pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
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
          </div>
          {errors.newPassword && (
            <span className="text-red-600 my-3">
              {errors.newPassword.message}
            </span>
          )}
        </div>
        <div className="relative">
          <label className="block text-primary ">
            Confirm new Password <span className="sr-only">Required</span>
          </label>
          <input
            type={isConfirmPasswordVisable ? 'text' : 'password'}
            placeholder="Confirm your Password"
            className="bg-inherit placeholder-gray-400 pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
            {...register('confirmNewPassword', {
              required: 'Confirm your new password',
              validate: (value) =>
                value === watch('newPassword') || 'The password does not match',
            })}
          />
          <div className="absolute  right-2  top-[30px] text-white">
            <button
              type="button"
              onClick={() => setIsConfirmPasswordVisable((prev) => !prev)}
              className=" outline-none"
            >
              {isConfirmPasswordVisable ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
          </div>
        </div>
        {errors.confirmNewPassword && (
          <span className="text-red-600 my-3">
            {errors.confirmNewPassword.message}
          </span>
        )}
        <div className="text-center py-8">
          <button
            className="text-white bg-primary hover:bg-primary_hover w-full rounded-3xl py-2 font-semibold tracking-wide flex justify-center items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Submiting ...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
          
    </div>
  );
}
