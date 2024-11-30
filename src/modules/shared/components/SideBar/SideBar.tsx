// import React from 'react'
import { useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { GrProjects } from 'react-icons/gr';
import { LuUsers } from 'react-icons/lu';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from 'react-router';
export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <Sidebar
      className="h-[93vh]  bg-[#0E382F]  text-white  relative"
      collapsed={isCollapsed}
    >
      <span
        className="block  absolute right-0 bg-primary  py-2  mt-2 text-2xl cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </span>
      <Menu className="mt-14">
        <MenuItem component={<Link to="/users" />} icon={<LuUsers />}>
          Users
        </MenuItem>
        <MenuItem component={<Link to="/projects" />} icon={<GrProjects />}>
          {' '}
          Projects{' '}
        </MenuItem>
        <MenuItem component={<Link to="/tasks" />} icon={<FaTasks />}>
          {' '}
          Tasks{' '}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
