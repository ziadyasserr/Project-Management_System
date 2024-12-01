import React from 'react'
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDATION } from '../../../../services/validation/validation'
import { axiosInstance,  USERS_URLS } from '../../../../services/apisUrls/apisUrls'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

interface FormData {
  email: string;
}

export default function ForgetPassword() {
  let navigate = useNavigate()
  let { register, formState: { isSubmitting, errors }, handleSubmit } = useForm<FormData>()
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axiosInstance.post(USERS_URLS.RESET_REQUEST, data)
      console.log(response)
      toast.success("check your mail")
      navigate('/reset-password', { state: data.email })
    } catch (error:any) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
  }
  return (
    <div>
      <div className="my-10">
        <h6 className="text-white">Welcome to PMS</h6>
        <h2 className="text-primary font-bold text-3xl tracking-wide">
          <span className="capitalize border-b-4 border-primary">F</span>orgot password
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-primary ">E-mail</label>
          <input
            type="text"
            placeholder="Enter your E-mail"
            className="bg-inherit placeholder-white pb-2 border-b border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
            {...register("email", EMAIL_VALIDATION)}
          />
        </div>
        {errors.email && (
          <span className="text-red-600 my-3">{errors.email.message}</span>
        )}
        <div className="text-center py-8">
          <button disabled={isSubmitting}
            className="text-white bg-primary hover:bg-primary_hover w-full rounded-3xl py-2 font-semibold tracking-wide"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}
