import { redirect, LoaderFunction } from 'react-router-dom';
import { AppwriteException } from 'appwrite';

import { account } from '@/lib/appwrite';

const loginLoader: LoaderFunction = async () => {
  try {
    await account.get();
    return redirect('/');
  } catch (error) {
    if (error instanceof AppwriteException) {
      if (error.code === 401) {
        console.warn("User is not authenticated (Expected behavior).");
      } else {
        console.error("Unexpected Appwrite error:", error);
      }
    } else {
      console.error("Unexpected error:", error);
    }

    return null;
  }
};

export default loginLoader;
