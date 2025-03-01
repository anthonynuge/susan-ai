import { account, databases } from "../../lib/appwrite";
import { UserModel, DocumentModel } from "@/types/appwriteModels";

import { redirect, LoaderFunction } from "react-router-dom";

type ParamsType = {
  chatId: string
}

interface ChatLoaderData {
  user?: UserModel;
  chat?: DocumentModel;
}

const chatLoader: LoaderFunction = async ({ params }) => {
  const { chatId } = params as ParamsType;

  if (!chatId) {
    console.log("Chat ID is missing redirect to home...")
    return redirect("/")
  }

  const data: ChatLoaderData = {};

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
