import { databases } from "../../lib/appwrite"
import { getGeminiResponse } from "../../api/geminiAI"
import { ID } from "appwrite"


const chatAction = async ({ request, params }) => {
  const { chatId } = params;

  const formData = await request.formData();
  const userPrompt = formData.get('user_prompt');

  let convoHistory = [];
  let susanResponse = '';

  try {
    const result = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "chats",
      chatId
    )
    convoHistory = result.convos.map(({ user_prompt, ai_response }) => {
      return { user_prompt, ai_response }
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error retreiving chat histroy from params ${error.message}`)
    }
  }

  try {
    susanResponse = await getGeminiResponse(userPrompt, convoHistory);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Susan Response error: ${error.message}`)
    }
  }


  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "convos",
      ID.unique(),
      {
        user_prompt: userPrompt,
        ai_response: susanResponse,
        chat: chatId,
      }
    )

  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error saving response to database: ${error.message}`)
    }
  }

  return null;
}

export default chatAction
