import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ChangePassword from './modules/authentacation/components/ChangePassword/ChangePassword';
import ForgetPassword from './modules/authentacation/components/ForgetPassword/ForgetPassword';
import Login from './modules/authentacation/components/Login/Login';
// import Register from './modules/authentacation/components/Register/Register';
import ResetPassword from './modules/authentacation/components/ResetPassword/ResetPassword';
import Verify from './modules/authentacation/components/Verify/Verify';
import Dashboard from './modules/dashboard/components/Dashboard';
import ProjectForm from './modules/projects/components/ProjectForm/ProjectForm.js';
import ProjectsList from './modules/projects/components/ProjectsList/ProjectsList';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import NotFound from './modules/shared/components/NotFound/NotFound';
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute';
import TaskForm from './modules/tasks/components/TaskForm/TaskForm.js';
import TasksList from './modules/tasks/components/TasksList/TasksList';
import TaskUser from './modules/tasks/components/TaskUser/TaskUser.js';
import UsersList from './modules/users/components/UsersList/UsersList';
import Register from './modules/authentacation/components/Register/Register.js';
import ChangePassword from './modules/authentacation/components/ChangePassword/ChangePassword.js';

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
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'projects', element: <ProjectsList /> },
        { path: 'projects/new-project', element: <ProjectForm /> },
        { path: 'projects/:projectId', element: <ProjectForm /> },
        { path: 'tasks', element: <TasksList /> },
        { path: 'tasks-user', element: <TaskUser /> },
        { path: 'task/new-task', element: <TaskForm /> },
        { path: 'task/:taskId', element: <TaskForm /> },
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
