import PageTitle from "../components/PageTitle"

import { useLoaderData } from "react-router-dom"
import UserPrompt from "../components/UserPrompt";
import SusanResponse from "../components/SusanResponse";

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
            <SusanResponse text={convo.ai_response} />
          </div>

        )
        )}
      </div>
    </>
  )
}

export default Chat
