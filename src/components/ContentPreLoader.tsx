import SusanResponse from "./SusanResponse"
import TypingLoader from "./TypingLoader";
import UserPrompt from "./UserPrompt"


interface ContentPreloaderProps {
  text: string;
}

const ContentPreloader = ({ text }: ContentPreloaderProps) => {
  return (
    <div>
      <UserPrompt text={text} />
      <SusanResponse >
        <TypingLoader />
      </SusanResponse>
    </div>
  )
}

export default ContentPreloader
