<<<<<<< Updated upstream
import React from 'react'
=======
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../../services/validation/validation'
import { axiosInstance,  USERS_URLS } from '../../../../services/apisUrls/apisUrls'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { FaEyeSlash, FaRegEye, FaSpinner } from 'react-icons/fa'

interface FormInputs {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string; // OTP
}
>>>>>>> Stashed changes

export default function ResetPassword() {
  return (
<<<<<<< Updated upstream
    <div>ResetPassword</div>
=======
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
        <div>
          <label className="block text-primary ">Password</label>
          <div className='flex justify-between items-center'>
          <input
            type={isPawwordVisible ? "text" : "password"}
            placeholder="Enter your new password"
            className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
            {...register("password", PASSWORD_VALIDATION)}
          />
          <button type='button' className='text-white' onMouseDown={(e) => {
            e.preventDefault()
          }} onMouseUp={(e) => {
            e.preventDefault()
          }} onClick={() => {
            setIsPawwordVisible((prev) => !prev)
          }}>
            {isPawwordVisible ? <FaRegEye /> : <FaEyeSlash />}
          </button>
          </div>
        </div>
        {errors?.password && (
          <span className="text-red-600 my-3">{errors?.password?.message}</span>
        )}
        </div>

        <div className='mb-3'>
        <div>
          <label className="block text-primary ">Confirm Password</label>
          <div className='flex justify-between items-center'>
          <input
            type={isConfirmPawwordVisible ? "text" : "password"}
            placeholder="Confirm your password"
            className="bg-inherit placeholder-white pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
            {...register("confirmPassword", { required: "Confirm your password" })}
          />
          <button type='button' className='text-white' onMouseDown={(e) => {
            e.preventDefault()
          }} onMouseUp={(e) => {
            e.preventDefault()
          }} onClick={() => {
            setIsConfirmPawwordVisible((prev) => !prev)
          }}>
            {isConfirmPawwordVisible ? <FaRegEye /> : <FaEyeSlash />}
          </button>
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
>>>>>>> Stashed changes
  )
}
