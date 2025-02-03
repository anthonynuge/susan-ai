import React from 'react';
import { avatars } from '../lib/appwrite';

type UserAvatarProps = {
  name: string;
};

// takes in name and parses it.
const UserAvatar: React.FC<UserAvatarProps> = ({ name }) => {
  return (
    <div className="rounded-full overflow-hidden min-w-[35px] max-w-[35px]">
      <img
        src={avatars.getInitials(name, 45, 45)}
        alt="user"
        width={45}
        height={45}
      />
    </div>
  );
};

export default UserAvatar;
