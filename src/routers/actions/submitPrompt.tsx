import { redirect } from 'react-router-dom';

import { getConvoTitle, getGeminiResponse } from '@/api/geminiAI.ts';
import { account, databases } from '@/lib/appwrite.ts'
import { ID } from "appwrite"


const chatDeleteAction = async (formData: FormData) => {
  const chatId = formData.get('chat_id') as string | null;
  const chatTitle = formData.get('chat_title') as string | null;

  if (!chatId) {
    console.error("Missing ChatId.")
    return { error: "ChatId is required" };
  }

  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'chats',
      chatId
    )
    return { chatTitle }

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error deleting chat. ${error.message}`)
      return { error: "Failed to delete the chat" }
    }
  }
}

const userPromptAction = async (formData: FormData) => {
  const prompt = formData.get('user_prompt') as string | null;

  if (!prompt) {
    return { error: "Prompt is required" }
  }


  let chat = null;

  try {
    // get the users data
    const user = await account.get();
    const title = await getConvoTitle(prompt);

    chat = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'chats',
      ID.unique(),
      {
        title: title,
        user_id: user.$id,
      }
    )
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Oops error starting a chat ${error.message}`)
    }
  }

  const geminiResponse = await getGeminiResponse(prompt);
  try {
    if (!chat) {
      throw new Error("Chat is currently null")
    }

    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'convos',
      ID.unique(),
      {
        user_prompt: prompt,
        ai_response: geminiResponse,
        chat: chat.$id
      }
    )

    return redirect(`/${chat.$id}`);

  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error creating convo: ${error.message}`);
    }
  }
}

// Async function that does different things depending on the request
// returns Promise based on the type
const submitPrompt = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const requestType = formData.get('request_type') as string | null;

  if (!requestType) {
    console.warn("Request type is missing.");
    return { error: "Request type is required" };
  }

  if (requestType === 'user_prompt') {
    return await userPromptAction(formData);
  } else if (requestType === 'delete_chat') {
    return await chatDeleteAction(formData);
  }

  console.warn(`Unknown request type ${requestType}`);
  return { error: "Invalid request type" };
}

export default submitPrompt
