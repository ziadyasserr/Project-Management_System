import { useContext, useEffect, useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { GrProjects } from 'react-icons/gr';
import { IoHomeOutline } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved === 'true';
  });

  const location = useLocation();
  const { loginData } = useContext(AuthContext);

  const getActiveClass = (path) =>
    location.pathname === path ? 'ps-active' : '';

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  return (
    <Sidebar
      className="h-screen bg-[#0E382F] text-white relative z-20"
      collapsed={isCollapsed}
    >
      <button
        className="block absolute right-0 bg-primary py-2 mt-2 text-2xl cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </button>
      <Menu className="mt-14">
        <MenuItem
          component={<Link to="/dashboard" />}
          icon={<IoHomeOutline />}
          className={getActiveClass('/dashboard')}
        >
          Home
        </MenuItem>
        {loginData?.userGroup !== 'Employee' && (
          <MenuItem
            component={<Link to="/users" />}
            icon={<LuUsers />}
            className={getActiveClass('/users')}
          >
            Users
          </MenuItem>
        )}
        <MenuItem
          component={<Link to="/projects" />}
          icon={<GrProjects />}
          className={getActiveClass('/projects')}
        >
          Projects
        </MenuItem>
        {loginData?.userGroup !== 'Employee' ? (
          <MenuItem
            component={<Link to="/tasks" />}
            icon={<FaTasks />}
            className={getActiveClass('/tasks')}
          >
            Tasks
          </MenuItem>
        ) : (
          <MenuItem
            component={<Link to="/tasks-user" />}
            icon={<FaTasks />}
            className={getActiveClass('/tasks-user')}
          >
            Tasks
          </MenuItem>
        )}
      </Menu>
    </Sidebar>
  );
}
