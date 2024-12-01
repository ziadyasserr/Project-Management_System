import { useContext, useState } from 'react';
import { HiMiniBellAlert } from 'react-icons/hi2';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import human from '../../../../assets/human.png';
import logo from '../../../../assets/logo.png';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function Navbar() {
  const { loginData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center bg-gray-50 shadow-lg py-1  px-5">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className="flex items-center gap-5">
          <div>
            <HiMiniBellAlert className="text-yellow-500 text-3xl " />
          </div>
          <div className="border-r border-[#9A9A9A] h-8"></div>

          <div className="flex items-center gap-5">
            <div>
              <img
                src={human}
                alt="my-pic"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>
              <span className="block font-semibold">{loginData?.userName}</span>
              <span className="block text-gray-500 text-sm">
                {loginData?.userEmail}
              </span>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                // className="text-gray-700 hover:text-gray-900 focus:outline-non"
              >
                <RiArrowDropDownLine className="text-2xl" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white border border-gray-200 rounded shadow-md z-50 ">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm  hover:bg-red-50"
                  >
                    Logout
                  </button>
                  <Link className="text-left px-4 py-2 text-sm  hover:bg-red-50 w-full block " to={"/change-password"}>
                    ChangePassword
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
