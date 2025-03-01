import { redirect, LoaderFunction } from 'react-router-dom';
import { Query } from 'appwrite';
import { account, databases } from '@/lib/appwrite';

import { ChatList, UserModel } from '@/types/appwriteModels';

interface AppLoaderData {
  user?: UserModel;
  chats?: ChatList;
}

const appLoader: LoaderFunction = async (): Promise<AppLoaderData> => {
  const data: AppLoaderData = {};

  try {
    data.user = await account.get();
  } catch (err) {
    console.error('Problem retrieving user session: ', err);
    throw redirect('./login');
  }

  if (!data.user) {
    throw redirect('./login');
  }

  try {
    data.chats = await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "chats",
      [
        Query.select(['$id', 'title']),
        Query.orderDesc('$createdAt'),
        Query.equal('user_id', data.user.$id)
      ]
    )
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error loading chats ${error.message}`)
    }
  }
  return data;
};

export default appLoader;
