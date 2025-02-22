import React from 'react'
import UserAvatar from './UserAvatar';
import { useLoaderData } from 'react-router-dom';

interface UserPromptProps {
  text: string;
}

const UserPrompt: React.FC<UserPromptProps> = ({ text }) => {
  const { user } = useLoaderData();

  return (
    <div className='flex flex-col-reverse px-1 items-end md:grid gap-1 py-3 md:grid-cols-[minmax(0,1fr)_max-content_max-content] md:gap-4'>
      <p className='md:col-start-2 pt-1 whitespace-pre-wrap'>{text}</p>
      <UserAvatar className="md:col-start-3" name={user?.name} />
    </div>
  )
}

export default UserPrompt
