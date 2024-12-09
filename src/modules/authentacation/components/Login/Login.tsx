import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEyeSlash, FaSpinner } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
import {
  publicAxiosInstance,
  USERS_URLS,
} from '../../../../services/apisUrls/apisUrls';
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from '../../../../services/validation/validation';

interface loginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message: string;
}

export default function Login() {
  const [isPasswordVisable, setIsPasswordVisable] = useState(false);
  const navigate = useNavigate();
  const { saveLoginData } = useContext(AuthContext);
  const {
    register, 
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: loginData) => {
    // console.log(data);
    try {
      const response = await publicAxiosInstance.post<LoginResponse>(USERS_URLS.LOGIN, data);
     
      localStorage.setItem('token', response.data.token);
      saveLoginData();
      // console.log(response);
      toast.success(response?.data?.message || 'Login Successfully');
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Login failed');
    }
  };
  return (
    <>
      <div className="">
        <div className="my-10">
          <h6 className="text-white">welcome to PMS </h6>
          <h2 className="text-primary  font-bold text-3xl tracking-wide">
            <span className="capitalize border-b-4 border-primary">L</span>ogin
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-primary ">E-mail</label>
            <input
              type="email"
              placeholder="Enter your E-mail"
              className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
              {...register('email', EMAIL_VALIDATION)}
            />
            {errors?.email && (
              <span className="text-red-500">{errors?.email?.message}</span>
            )}
          </div>

          <div className="mt-5 relative">
            <label className="block text-primary ">Password</label>
            <input
              type={isPasswordVisable ? 'text' : 'password'}
              placeholder="Enter your password"
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
          <div className="flex justify-between items-center mt-4">
            <Link to="/register" className="text-white text-sm">
              Register Now ?
            </Link>
            <Link to="/forget-password" className="text-white text-sm">
              Forget Password ?
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
                  Login ...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
