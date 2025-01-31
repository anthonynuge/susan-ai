import { account } from '../../lib/appwrite';
import { AppwriteException } from 'appwrite';
import { redirect } from 'react-router-dom';

const loginUser = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  console.log(email, password);
  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log('User successfully logged in', session);
    return redirect('/');
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      return {
        message: error.message,
      };
    }
  }
};

export default loginUser;
