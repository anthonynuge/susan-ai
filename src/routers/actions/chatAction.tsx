import { ActionFunction } from "react-router-dom";
import { databases } from "@/lib/appwrite"
import { getGeminiResponse } from "@/api/geminiAI"
import { ID } from "appwrite"
import { toast } from "react-toastify";


const chatAction: ActionFunction = async ({ request, params }) => {
  const chatId = params.chatId

  if (!chatId) {
    console.error("Chat ID is missing!");
    return { success: false, error: "Chat ID is required" };
  }

  const formData = await request.formData();
  console.log("Chat Action: ", formData)
  const userPrompt = formData.get('user_prompt') as string || "";

  let convoHistory: { user_prompt: string; ai_response: string }[] = [];
  let susanResponse = '';

  try {
    const result = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      "chats",
      chatId
    )
    convoHistory = result.convos.map(({ user_prompt, ai_response }: { user_prompt: string; ai_response: string }) => {
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
      toast.error('Error generating response')
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

  return { success: true };
}

export default chatAction
