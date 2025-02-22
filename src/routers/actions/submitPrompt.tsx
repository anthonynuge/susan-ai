import { redirect } from 'react-router-dom';

import { getConvoTitle, getGeminiResponse } from '../../api/geminiAI.ts';
import { account, databases } from '../../lib/appwrite.ts'
import { ID } from "appwrite"

const userPromptAction = async (formData) => {
  const prompt = formData.get('user_prompt')

  // get the users data
  const user = await account.get();
  const title = await getConvoTitle(prompt);

  let chat = null;

  try {
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
  const requestType = formData.get('request_type')

  if (requestType === 'user_prompt') {
    return await userPromptAction(formData);
  }

}

export default submitPrompt
