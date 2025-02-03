import { redirect } from 'react-router-dom';

import { account } from '../../lib/appwrite';

const signupLoader = async () => {
  try {
    const user = await account.get();
    console.log(user);
    return redirect('/');
  } catch (error) {
    console.error('Issue grabbing user: ', error);
  }
};

export default signupLoader;
