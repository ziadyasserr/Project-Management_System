import { Outlet } from 'react-router-dom';
// import authbg from '../../../../assets/auth2-bg.png';
import authbg from '../../../../assets/images/authcircle.svg';
import formImg from '../../../../assets/images/form.png';

export default function AuthLayout() {
  return (
    <>
      <div
        className="bg-cover bg-no-repeat bg-center h-full w-full "
        style={{
          backgroundImage: `url(${authbg})`,
          backgroundColor: '#0E382F',
        }}
      >
        <div className="flex flex-col justify-center items-center w-screen h-screen ">
          <div className="flex justify-center items-center w-[312px] h-[91px]  mb-3">
            <img src={formImg} alt="formImg" />
          </div>

          <div className=" bg-[rgba(49,89,81,0.9)] md:w-[680px] rounded-2xl w-full md:px-20  px-10 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
