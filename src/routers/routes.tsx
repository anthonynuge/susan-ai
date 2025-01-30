import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Signup from '../pages/Signup';

import signUpUser from './actions/signUpUser';

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
]);

export default router;
