import { createContext } from 'react';

export type UserData = {
  uid: string;
  email: string;
  emailVerified: boolean;
  name: string;
  token: string;
};

const Context = createContext({
  isLoggedIn: false,
  userId: '',
  email: '',
  emailVerified: false,
  name: '',
  token: '',
  login: (_data: UserData) => {},
  changeEmailStatus: (_data: boolean) => {},
  logout: () => {},
});

export default Context;
