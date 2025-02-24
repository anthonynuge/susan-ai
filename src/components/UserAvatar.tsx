import React from 'react';
import { avatars } from '../lib/appwrite';

type UserAvatarProps = {
  name: string;
  size?: number;
  className?: string;
};

// takes in name and parses it.
const UserAvatar: React.FC<UserAvatarProps> = ({ name, className, size = 45 }) => {
  return (
    <div className="rounded-full overflow-hidden min-w-[35px] max-w-[35px] max-h-[35px]">
      <img
        src={avatars.getInitials(name, size, size)}
        alt="user"
        width={size}
        height={size}
        className={className}
      />
    </div>
  );
};

export default UserAvatar;
