import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

import signUpUser from './actions/signUpUser';
import loginUser from './actions/loginUser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signup',
    element: <Signup />,
    action: signUpUser,
  },
  {
    path: '/login',
    element: <Login />,
    action: loginUser,
  },
]);

export default router;
