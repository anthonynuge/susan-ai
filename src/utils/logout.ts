import { NavigateFunction } from 'react-router-dom';
import { account } from '../lib/appwrite';

const logout = async (navigate: NavigateFunction): Promise<void> => {
  try {
    await account.deleteSession('current');
    navigate('/login');
  } catch (error) {
    return console.error('Error during logout:', error);
  }
};

export default logout;
