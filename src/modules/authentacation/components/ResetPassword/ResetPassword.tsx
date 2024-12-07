
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../../services/validation/validation'
import { publicAxiosInstance,  USERS_URLS } from '../../../../services/apisUrls/apisUrls'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


import { FaEyeSlash, FaRegEye, FaRegEyeSlash, FaSpinner } from 'react-icons/fa'
import { IoEyeOutline } from 'react-icons/io5'


interface FormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string; // OTP
}


export default function ResetPassword() {
  const navigate = useNavigate()
  const [isPasswordVisable, setIsPasswordVisable] = useState(false);
  const [isConfirmPasswordVisable, setIsConfirmPasswordVisable] = useState(false);
  const location = useLocation()
  let { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<FormInputs>({ defaultValues: { email: location.state }, mode: 'onChange' })
  const onSubmit = async (data:any) => {
    try {
      const response:any = await publicAxiosInstance.post(USERS_URLS.RESET, data)
      console.log(response);
      toast.success("Password updated successfully")
      navigate("/login")
    } catch (error:any) {
      console.log(error);
      toast.error(error?.response?.data?.message)
    }
  }
  return (

    <div className="">
      <div className="my-10">
        <h6 className="text-white">Welcome to PMS</h6>
        <h2 className="text-primary  font-bold text-3xl tracking-wide">
          <span className="capitalize border-b-4 border-primary">R</span>eset password
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
        <div>
          <label className="block text-primary ">E-mail</label>
          <input
            type="email"
            disabled={true}
            placeholder="Enter your E-mail"
            className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
            {...register("email", EMAIL_VALIDATION)}
          />
        </div>
        {errors?.email && (
          <span className="text-red-600 my-3">{errors?.email?.message}</span>
        )}
        </div>

        <div className='mb-3'>
        <div className='relative'>
          <label className="block text-primary ">Password</label>
          <div className='flex justify-between items-center'>
          <input
            type={isPasswordVisable ? "text" : "password"}
            placeholder="Enter your new password"
            className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
            {...register("password", PASSWORD_VALIDATION)}
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
        </div>
        {errors?.password && (
          <span className="text-red-600 my-3">{errors?.password?.message}</span>
        )}
        </div>

        <div className='mb-3'>
        <div className='relative'>
          <label className="block text-primary ">Confirm Password</label>
          <div className='flex justify-between items-center'>
          <input
            type={isConfirmPasswordVisable ? "text" : "password"}
            placeholder="Confirm your password"
            className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
            {...register("confirmPassword", { required: "Confirm your password" })}
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
        </div>
        {errors?.confirmPassword && (
          <span className="text-red-600 my-3">{errors?.confirmPassword?.message}</span>
        )}
        </div>

        <div className='mb-3'>
        <div>
          <label className="block text-primary ">OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
            {...register("seed", { required: "OTP is requird" })}
          />
        </div>
        {errors?.seed && (
          <span className="text-red-600 my-3">{errors?.seed?.message}</span>
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
                Submiting ...
              </>
            ) : (
              'Submit'
            )}

          </button>
        </div>
      </form>
    </div>

  )
}
