import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEyeSlash, FaSpinner } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  axiosInstance,
  USERS_URLS,
} from '../../../../services/apisUrls/apisUrls';
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from '../../../../services/validation/validation';

interface RegisterData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage?: File;
}

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: RegisterData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    try {
      const response = await axiosInstance.post(USERS_URLS.REGISTER, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response?.data?.message || 'Register Successfully');
      navigate('/Verify', { state: data.email });
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="   ">
      <div className=" my-10">
        <h6 className="text-white text-sm">Welcome to PMS</h6>
        <h2 className="text-primary font-bold text-3xl tracking-wide">
          <span className="capitalize border-b-4 border-primary">R</span>
          egister
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-primary">User Name</label>
            <input
              type="text"
              placeholder="Name"
              className="bg-inherit placeholder-gray-300 pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('userName', { required: 'User name is required' })}
            />
            {errors?.userName && (
              <span className="text-red-500 text-sm">
                {errors?.userName?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-primary">E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              className="bg-inherit placeholder-gray-300 pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('email', EMAIL_VALIDATION)}
            />
            {errors?.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-primary">Country</label>
            <input
              type="text"
              placeholder="Country"
              className="bg-inherit placeholder-gray-300 pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('country', { required: 'Country is required' })}
            />
            {errors?.country && (
              <span className="text-red-500 text-sm">
                {errors.country.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-primary">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              className="bg-inherit placeholder-gray-300 pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('phoneNumber', {
                required: 'Phone number is required',
              })}
            />
            {errors?.phoneNumber && (
              <span className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div className="relative">
            <label className="block text-primary">Password</label>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="bg-inherit placeholder-gray-300 pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('password', PASSWORD_VALIDATION)}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute right-2 top-8 text-white"
            >
              {isPasswordVisible ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
            {errors?.password && (
              <span className="text-red-500 text-sm">
                {errors?.password.message}
              </span>
            )}
          </div>

          <div className="relative">
            <label className="block text-primary">Confirm Password</label>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="bg-inherit placeholder-gray-300 pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('confirmPassword', PASSWORD_VALIDATION)}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="absolute right-2 top-8 text-white"
            >
              {isPasswordVisible ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </button>
            {errors?.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors?.confirmPassword?.message}
              </span>
            )}
          </div>

          {/* Input for Image */}
          <div>
            <label className="block text-primary">Profile Image</label>
            <input
              type="file"
              className="block text-white mt-2"
              {...register('profileImage')}
              onChange={(e) => setValue('profileImage', e.target.files?.[0])}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link to="/login" className="text-white text-sm">
            Login Now?
          </Link>
        </div>

        <div className="text-center py-8">
          <button
            className="text-white bg-primary hover:bg-primary_hover w-full rounded-3xl py-2 font-semibold tracking-wide flex justify-center items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Register ...
              </>
            ) : (
              'Register'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
