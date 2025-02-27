import PageTitle from "../components/PageTitle"

import { useLoaderData, useLocation } from "react-router-dom"
import UserPrompt from "../components/UserPrompt";
import SusanResponse from "../components/SusanResponse";
import { motion } from "framer-motion"
import ContentPreloader from "../components/ContentPreLoader";
import usePromptPreloader from "../hooks/usePromptPreloader";

const Chat = () => {
  const {
    chat: { title, convos }
  } = useLoaderData() || {};

  const { preLoaderVal } = usePromptPreloader();
  const loc = useLocation();

  return (
    <>
      <PageTitle title={`${title} | SusanAI`} />
      <motion.div
        className=""
        initial={!loc.state?._isRedirect && { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .25, delay: .07, ease: "easeOut" }}
      >
        {convos.map((convo) => (
          <div key={convo.$id}>
            <UserPrompt text={convo.user_prompt} />
            <SusanResponse text={convo.ai_response} />
          </div>

        )
        )}
      </motion.div>

      {preLoaderVal && (
        <ContentPreloader text={preLoaderVal} />
      )}
    </>
  )
}

export default Chat
