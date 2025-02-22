import { redirect } from 'react-router-dom';
import { Query } from 'appwrite';
import { account, databases } from '../../lib/appwrite';

const appLoader = async () => {
  const data = {};
  try {
    data.user = await account.get();
  } catch (err) {
    console.error('Problem retrieving user session: ', err);
    return redirect('./login');
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
