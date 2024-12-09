// import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { GrProjects } from 'react-icons/gr';
import { IoHomeOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from 'react-router';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';
export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true'; //string to boolean
  });
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  let { loginData } = useContext(AuthContext);

  return (
    <Sidebar
      className="h-screen  bg-[#0E382F]  text-white  relative z-20 "
      collapsed={isCollapsed}
    >
      <button
        className="block  absolute right-0 bg-primary  py-2  mt-2 text-2xl cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <Menu className="mt-14">
        <MenuItem component={<Link to="/dashboard" />} icon={<IoHomeOutline />}>
          {' '}
          Home
        </MenuItem>
        {loginData?.userGroup == 'Employee' ? (
          ''
        ) : (
          <MenuItem component={<Link to="/users" />} icon={<LuUsers />}>
            Users
          </MenuItem>
        )}
        <MenuItem component={<Link to="/projects" />} icon={<GrProjects />}>
          {' '}
          Projects{' '}
        </MenuItem>

        {loginData?.userGroup == 'Employee' ? (
          ''
        ) : (
          <MenuItem component={<Link to="/tasks" />} icon={<FaTasks />}>
            Tasks
          </MenuItem>
        )}

        {loginData?.userGroup == 'Employee' ? (
          <MenuItem component={<Link to="/tasks-user" />} icon={<FaTasks />}>
            Tasks
          </MenuItem>
        ) : (
          ''
        )}
      </Menu>
    </Sidebar>
  );
}
