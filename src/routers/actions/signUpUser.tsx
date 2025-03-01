import { account } from '../../lib/appwrite';
import { ID, AppwriteException } from 'appwrite';
import { redirect } from 'react-router-dom';

const signUpUser = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const name = formData.get('name')?.toString() || '';
  try {
    if (!email || !password || !name) {
      return { success: false, message: 'Missing required Fields' };
    }
    const user = await account.create(ID.unique(), email, password, name);
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.log('Sign up error:', error);
      return { success: false, message: `Appwrite error: ${error.message}` };
    }
  }

  try {
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created successfully.")
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      console.log('Session Error', error);
    }
    return redirect('/login');
  }

  return redirect('/');
};

export default signUpUser;
