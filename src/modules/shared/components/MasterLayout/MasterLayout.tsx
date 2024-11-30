import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function MasterLayout() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
