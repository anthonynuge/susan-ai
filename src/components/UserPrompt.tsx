import React, { useEffect, useRef, useState } from 'react'
import UserAvatar from './UserAvatar';
import { useLoaderData } from 'react-router-dom';
import IconBtn from './IconBtn';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

interface UserPromptProps {
  text: string;
}

const UserPrompt: React.FC<UserPromptProps> = ({ text }) => {
  const { user } = useLoaderData();
  const [isOpened, setIsOpened] = useState(false);
  const textPromptRef = useRef<HTMLParagraphElement | null>(null);
  const [hasMoreText, setHasMoreText] = useState(false)

  useEffect(() => {
    if (!textPromptRef.current) return;
    setHasMoreText(textPromptRef.current.scrollHeight > textPromptRef.current.clientHeight);
  }, [textPromptRef])


  return (
    <div className='grid grid-cols-1 gap-2 md:grid-cols-[max-content_minmax(0,1fr)_max-content] md:gap-4'>
      <UserAvatar name={user?.name} />
      <p className={`pt-1 whitespace-pre-wrap ${isOpened ? "" : 'line-clamp-4'}`}
        ref={textPromptRef}
      >
        {text}
      </p>
      {hasMoreText && (
        <IconBtn
          icon={isOpened ? <FaCaretDown /> : <FaCaretUp />}
          onClick={() => setIsOpened((prev) => !prev)}
          size='lg'
          variant='ghost'
          title={isOpened ? 'Collapse Text' : 'Expand text'}
        />
      )}
    </div >
  )
}

export default UserPrompt
