import { account } from '../../lib/appwrite';
import { ID, AppwriteException } from 'appwrite';

const signUpUser = async ({ request }: { request: Request }) => {
  try {
    const formData = await request.formData();

    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    const name = formData.get('name')?.toString() || '';

    if (!email || !password || !name) {
      return { success: false, message: 'Missing required Fields' };
    }

    const user = await account.create(ID.unique(), email, password, name);

    console.log('User created: ', user);
    return { success: true, data: user };
  } catch (error: unknown) {
    if (error instanceof AppwriteException) {
      return { success: false, message: `Appwrite error: ${error.message}` };
    }

    console.log('Sign up error:', error);
  }
};

export default signUpUser;
