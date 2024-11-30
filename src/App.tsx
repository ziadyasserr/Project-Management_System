import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from './modules/authentacation/components/ChangePassword/ChangePassword';
import ForgetPassword from './modules/authentacation/components/ForgetPassword/ForgetPassword';
import Login from './modules/authentacation/components/Login/Login';
import Register from './modules/authentacation/components/Register/Register';
import ResetPassword from './modules/authentacation/components/ResetPassword/ResetPassword';
import Verify from './modules/authentacation/components/Verify/Verify';
import Dashboard from './modules/dashboard/components/Dashboard';
import ProjectsList from './modules/projects/components/ProjectsList/ProjectsList';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import NotFound from './modules/shared/components/NotFound/NotFound';
import TasksList from './modules/tasks/components/TasksList/TasksList';
import UsersList from './modules/users/components/UsersList/UsersList';

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'verify', element: <Verify /> },
        { path: 'change-password', element: <ChangePassword /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ],
    },
    {
      path: '',
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'projects', element: <ProjectsList /> },
        { path: 'tasks', element: <TasksList /> },
        { path: 'users', element: <UsersList /> },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
