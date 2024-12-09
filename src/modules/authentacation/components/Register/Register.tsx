import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEyeSlash, FaSpinner } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCamera } from 'react-icons/fa';  // Camera icon import

import human from '../../../../assets/human.png';

import {
  publicAxiosInstance,
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
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [isImageSelected, setIsImageSelected] = useState(false); // Flag to indicate if an image is selected
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file change and update the form value
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('profileImage', file); // Bind the file to react-hook-form
      setImagePreview(URL.createObjectURL(file)); // Set the preview of the selected image
      setIsImageSelected(true); // Mark the image as selected
      console.log('Selected file:', file);
    }
  };

  const onSubmit = async (data: RegisterData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'profileImage' && value instanceof File) {
        formData.append(key, value); // Handle file specifically
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const response = await publicAxiosInstance.post(
        USERS_URLS.REGISTER,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    
      toast.success(response?.data?.message || 'Register Successfully');
      navigate('/Verify', { state: data.email });
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage =
        error?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  }; // <-- This was missing

  return (
    <div className="w-full">
      <div className="my-6">
        <h6 className="text-white text-sm">Welcome to PMS</h6>
        <h2 className="text-primary font-bold text-3xl tracking-wide">
          <span className="capitalize border-b-4 border-primary">R</span>egister
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex justify-center flex-col items-center mb-8 relative">
          <label htmlFor="profileImage" className="cursor-pointer relative ">
            <img
              src={imagePreview || human}
              alt="Profile"
              className={` w-[70px] h-[70px] rounded-full border border-gray-300 bg-[#3159518A]   ${isImageSelected ? 'opacity-80' : ''}`} // Apply opacity when image is selected
            />
            <FaCamera className="absolute top-[26px] right-[26px] text-white text-xl opacity-50  " /> 
          </label>
          <input
            type="file"
            id="profileImage"
            ref={fileInputRef}
            className="hidden"
            {...register('profileImage')}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

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
              type="tel"
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
