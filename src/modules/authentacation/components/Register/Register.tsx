import {  useState } from 'react';
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

interface registerData {
  userName : string;
  email : string;
  country : string;
  phoneNumber  : string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [isPasswordVisable, setIsPasswordVisable] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: registerData) => {
    console.log(data);
    try {
      const response = await axiosInstance.post(USERS_URLS.REGISTER, data);      
      // console.log(response);
      toast.success(response?.data?.message || 'Register Successfully');
      navigate('/Verify');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Register failed');
    }
  };
  return (
    <>
      <div className="">
        <div className="my-10 w-80">
          <h6 className="text-white">welcome to PMS </h6>
          <h2 className="text-primary  font-bold text-3xl tracking-wide">
            <span className="capitalize border-b-4 border-primary">R</span>egister
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form container">
            <div className="row flex justify-between items-center">
              <div className="col-md-6 ">
              <div>
            <label className="block text-primary ">User Name</label>
            <input
              type="text"
              placeholder="Name"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
              {...register('userName',{required:"user name is required"})}
            />
            {errors?.userName && (
              <span className="text-red-500">{errors?.userName?.message}</span>
            )}
          </div>

          <div>
            <label className="block text-primary ">E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
              {...register('email', EMAIL_VALIDATION)}
            />
            {errors?.email && (
              <span className="text-red-500">{errors?.email?.message}</span>
            )}
          </div>
          <div>
            <label className="block text-primary ">Country</label>
            <input
              type="text"
              placeholder="Country"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
              {...register('country',{required:"country is required"})}
            />
            {errors?.country && (
              <span className="text-red-500">{errors?.country?.message}</span>
            )}
          </div>
              </div>
              <div className="col-md-6">
              <div>
            <label className="block text-primary ">phone Number</label>
            <input
              type="phoneNumber"
              placeholder="phone Number"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
              {...register('phoneNumber', {required:"phone Number is required"})}
            />
            {errors?.phoneNumber && (
              <span className="text-red-500">{errors?.phoneNumber?.message}</span>
            )}
          </div>

          <div className="mt-5 relative">
            <label className="block text-primary ">Password</label>
            <input
              type={isPasswordVisable ? 'text' : 'password'}
              placeholder="password"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('password', PASSWORD_VALIDATION)}
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
            {errors?.password && (
              <span className="text-red-500">{errors?.password?.message}</span>
            )}
          </div>
          <div className="mt-5 relative">
            <label className="block text-primary ">Confirm Password</label>
            <input
              type={isPasswordVisable ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('confirmPassword', PASSWORD_VALIDATION)}
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
            {errors?.confirmPassword && (
              <span className="text-red-500">{errors?.confirmPassword?.message}</span>
            )}
          </div>
              </div>
            </div>
          </div>
        
          <div className="flex justify-between items-center mt-4">
            <Link to="/register" className="text-white text-sm">
              Login Now ?
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
    </>
  );
}
