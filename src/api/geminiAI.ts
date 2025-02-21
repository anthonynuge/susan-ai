import { model } from "../lib/geminiAi"

const getConvoTitle = async (userPrompt: string | Array<string>) => {
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

export { getConvoTitle }
