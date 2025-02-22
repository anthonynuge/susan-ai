import PageTitle from "../components/PageTitle"

import { useLoaderData } from "react-router-dom"
import UserPrompt from "../components/UserPrompt";

const Chat = () => {
  const {
    chat: { title, convos }
  } = useLoaderData() || {};

  return (
    <>
      <PageTitle title={`${title} | SusanAI`} />
      <div className="">
        {convos.map((convo) => (
          <div key={convo.$id}>
            <UserPrompt text={convo.user_prompt} />
            <p className="">{convo.ai_response}</p>
          </div>

        )
        )}
      </div>
    </>
  )
}

export default Chat
