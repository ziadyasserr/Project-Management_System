import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SideBar from '../SideBar/SideBar';

export default function MasterLayout() {
  return (
    <>
      <div>
        {/* <div className='sticky inset-0 z-30'> */}

        <Navbar />
        {/* </div> */}
        <div className="flex">
          <SideBar />
          <div className="w-full px-5 pt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
