import { getConvoTitle } from '../../api/geminiAI.ts';
import { account } from '../../lib/appwrite.ts'

const userPromptAction = async (formData) => {
  const prompt = formData.get('user_prompt')

  // get the users data
  const user = await account.get();
  const title = await getConvoTitle(prompt);
  console.log(title)

  return null;
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
