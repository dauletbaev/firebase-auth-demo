import { useEffect, useState } from 'react';
import Context from './context';
import type { UserData } from './context';

type Props = {
  children: React.ReactNode;
};

function ContextProvider(props: Props) {
  const [state, setState] = useState({
    isLoggedIn: false,
    userId: '',
    name: '',
    token: '',
    email: '',
    emailVerified: false,
  });

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      setState({
        isLoggedIn: true,
        userId: parsedUser.uid,
        token: parsedUser.token,
        name: parsedUser.name ?? '',
        email: parsedUser.email,
        emailVerified: parsedUser.emailVerified,
      });
    }
  }, []);

  const login = (user: UserData) => {
    setState({
      isLoggedIn: true,
      userId: user.uid,
      ...user,
    });
  };

  const changeEmailStatus = (emailVerified: boolean) => {
    setState((prevState) => ({ ...prevState, emailVerified: emailVerified }));
  };

  const logout = () => {
    localStorage.clear();
    setState({
      isLoggedIn: false,
      userId: '',
      name: '',
      token: '',
      email: '',
      emailVerified: false,
    });
  };

  const value = {
    ...state,
    logout,
    login,
    changeEmailStatus,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export default ContextProvider;
