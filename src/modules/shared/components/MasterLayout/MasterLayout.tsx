import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';

export default function MasterLayout() {
  return (
    <>
      <div className=''>
        <div>
          <Navbar />
        </div>
        <div className="flex">
          <div className="">
            <SideBar />
          </div>
          <div className="w-full px-5 pt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
