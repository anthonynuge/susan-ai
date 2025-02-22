import { account, databases } from "../../lib/appwrite";

import { redirect } from "react-router-dom";

type ParamsType = {
  chatId: string
}

const chatLoader = async ({ params }: { params: ParamsType }) => {
  const { chatId } = params;
  const data = {};

  // try to get user data using the chatId
  try {
    data.user = await account.get()
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Chat loader error getting user account ${error.message} `)
    }
    return redirect('/login')
  }

  try {
    // get chat document from the database
    data.chat = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "chats",
      chatId
    )
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error retrieving chats ${error.message}`)
    }
    throw error;
  }
  return data;
}

export default chatLoader;
