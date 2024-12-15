import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  publicAxiosInstance,
  USERS_URLS,
} from '../../../../services/apisUrls/apisUrls';
import { EMAIL_VALIDATION } from '../../../../services/validation/validation';

interface verifyData {
  email: string;
  code: string;
}

export default function Verify() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: location.state } });

  const onSubmit = async (data: verifyData) => {
    // console.log(data);
    try {
      const response = await publicAxiosInstance.put(USERS_URLS.VERIFY, data);
      toast.success(response?.data?.message || 'Verfiy Successful');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Verify failed');
    }
  };
  return (
    <>
      <div className="">
        <div className="my-10">
          <h6 className="text-white">welcome to PMS </h6>
          <h2 className="text-primary  font-bold text-3xl tracking-wide">
            <span className="capitalize border-b-4 border-primary">V</span>erify
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-primary ">E-mail</label>
            <input
              type="email"
              placeholder="Enter your E-mail"
              className="bg-inherit placeholder-gray-400 pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white "
              {...register('email', EMAIL_VALIDATION)}
            />
            {errors?.email && (
              <span className="text-red-500">{errors?.email?.message}</span>
            )}
          </div>

          <div className="mt-5 relative">
            <label className="block text-primary ">OTP</label>
            <input
              type="text"
              placeholder="OTP code"
              className="bg-inherit placeholder-gray-400 pb-2 border-b  border-gray-400 w-full placeholder:tracking-wide focus:outline-none text-white"
              {...register('code')}
            />
            {errors?.code && (
              <span className="text-red-500">{errors?.code?.message}</span>
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
                  Verifying ...
                </>
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
