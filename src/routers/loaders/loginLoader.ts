import { redirect } from 'react-router-dom';

import { account } from '../../lib/appwrite';

const loginLoader = async () => {
  try {
    const user = await account.get();
    return redirect('/');
  } catch (error) {
    console.error('Issue grabbing user: ', error);
  }
};

export default loginLoader;
