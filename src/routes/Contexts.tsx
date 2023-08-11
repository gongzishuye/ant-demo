import React, { ReactNode, useState } from 'react';

interface UserState {
  username: string | null;
  
  isLogged: boolean;
  
  login: (username: string) => void;
  
  logout: () => void;
}

export const fAvatar = 'https://xsgames.co/randomusers/assets/avatars/pixel/33.jpg';
export const mAvatar = 'https://xsgames.co/randomusers/assets/avatars/pixel/34.jpg';

const UserContext = React.createContext<UserState|null>(null);

export default UserContext;
