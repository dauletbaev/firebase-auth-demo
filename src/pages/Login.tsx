import { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../firebase';
import { saveUser } from '../utils/save-user';
import { useNavigate } from 'react-router-dom';
import Context from '../context/context';

type Args = [typeof auth, string, string];
type Props = {
  isLoggedIn: boolean;
};

function Login({ isLoggedIn }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ctx = useContext(Context);
  const naviagte = useNavigate();

  useEffect(() => {
    if (isLoggedIn) naviagte('/');
  }, [isLoggedIn, naviagte]);

  const title = mode === 'login' ? 'Login' : 'Register';

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const args: Args = [auth, email.trim(), password.trim()];
    let userCredential: UserCredential;

    try {
      if (mode === 'register') {
        userCredential = await createUserWithEmailAndPassword(...args);
        await sendEmailVerification(userCredential.user);
      } else {
        userCredential = await signInWithEmailAndPassword(...args);
      }

      const user = userCredential.user;
      if (name.trim().length > 0) {
        await updateProfile(user, { displayName: name.trim() });
      }
      const data = await saveUser(user, name.trim());
      ctx.login(data);

      naviagte('/');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      switch (errorCode) {
        case 'auth/email-already-in-use':
          alert('The email address is already in use by another account.');
          break;

        case 'auth/wrong-password':
          alert('Invalid user credentials.');
          break;

        default:
          alert(errorMessage);
          break;
      }
    }
  };

  const changeMode = (e: React.MouseEvent) => {
    e.preventDefault();

    setMode((prevMode) => {
      if (prevMode === 'login') return 'register';
      return 'login';
    });
  };

  return (
    <div className="login">
      <h1>{title}</h1>

      <form onSubmit={onSubmit} autoComplete="off">
        {mode === 'register' && (
          <>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>{title}</button>
      </form>

      <div className="links">
        <span>
          {mode === 'login' ? 'No account register' : 'Already have an account'}
        </span>
        <a href="#" onClick={changeMode}>
          {mode === 'login' ? 'Register' : 'Login'}
        </a>
      </div>
    </div>
  );
}

export default Login;
