import { model } from "../lib/geminiAi"

const getConvoTitle = async (userPrompt: string) => {
  try {
    const result = await model.generateContent(
      `Given a user prompt, generate a concise informative title that describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not markdown.
      Prompt: ${userPrompt},
      `
    );
    return result.response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.log(`There was a error generating the title for this conversation: ${error.message}`)
    }
  }
}

// get a response takes in userpromp or an array <user promp, ai response>
// returns a promise 
// https://ai.google.dev/gemini-api/docs/text-generation?lang=node
const getGeminiResponse = async (userPrompt: string, chatHistory = []): Promise<string> => {
  const history = [];
  chatHistory.forEach(({ user_prompt, ai_response }) => {
    history.push(
      {
        role: 'user',
        parts: [{ text: user_prompt }]
      },
      {
        role: "model",
        parts: [{ text: ai_response }]
      }
    )
  })

  try {
    // temptuere is degree of radomeness. lower temps is less open ended, higher is creative, 0 i sbest probability
    // tokens is 4 characters
    model.generationConfig = {
      temperature: 1.5
    }
    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userPrompt);
    return result.response.text();

  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error getting response ${error.message}`)
    }
    return "";
  }
}

export { getConvoTitle, getGeminiResponse }
