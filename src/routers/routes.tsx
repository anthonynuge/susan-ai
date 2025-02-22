import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

import signUpUser from './actions/signUpUser';
import loginUser from './actions/loginUser';
import submitPrompt from './actions/submitPrompt'

import appLoader from './loaders/appLoader';
import signupLoader from './loaders/signupLoader';
import loginLoader from './loaders/loginLoader';
import Chat from '../pages/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    action: submitPrompt,
    children: [
      {
        path: '/:chatId',
        element: <Chat />,
      }
    ]
  },
  {
    path: '/signup',
    element: <Signup />,
    loader: signupLoader,
    action: signUpUser,
  },
  {
    path: '/login',
    element: <Login />,
    loader: loginLoader,
    action: loginUser,
  },
]);

export default router;
