// hooks
// utils
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from 'src/recoils/authState';
import createAvatar from 'src/utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const [user, setUser] = useState({});

  const userState = useRecoilValue(authState);

  useEffect(() => {
    setUser(userState.user);
  }, []);

  const displayName = `${user?.lastName} ${user?.firstName}`;

  return (
    <Avatar
      src={user?.profilePhoto?.url}
      alt={displayName}
      color={user?.profilePhoto?.url ? 'default' : createAvatar(displayName).color}
      {...other}
    >
      {createAvatar(displayName).name}
    </Avatar>
  );
}
