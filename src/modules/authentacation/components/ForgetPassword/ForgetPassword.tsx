import React from 'react'
<<<<<<< Updated upstream
=======
import { useForm } from 'react-hook-form'
import { EMAIL_VALIDATION } from '../../../../services/validation/validation'
import { axiosInstance,  USERS_URLS } from '../../../../services/apisUrls/apisUrls'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'

interface FormData {
  email: string;
}
>>>>>>> Stashed changes

export default function ForgetPassword() {
  return (
<<<<<<< Updated upstream
    <div>ForgetPassword</div>
=======
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
