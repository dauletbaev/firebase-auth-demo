import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import Context from '../context/context';
import { auth } from '../firebase';
import { saveUser } from '../utils/save-user';

type Props = {
  isLoggedIn: boolean;
  name: string;
  userId: string;
  emailVerified: boolean;
  email: string;
  token: string;
};

function User(props: Props) {
  const [emailVerified, setEmailVerified] = useState(props.emailVerified);
  const navigate = useNavigate();
  const ctx = useContext(Context);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailVerified(user.emailVerified);
        ctx.changeEmailStatus(user.emailVerified);
        saveUser(user, props.name);
      } else {
        navigate('/login');
      }
    });

    unsubscribe();
  }, [navigate]);

  const logout = async () => {
    await auth.signOut();
    ctx.logout();

    navigate('/login');
  };

  return (
    <div className="user">
      <h1>Hello {props.name}</h1>
      <p>
        Your user id is <strong>{props.userId}</strong>
      </p>
      <p>
        Your email is <strong>{props.email}</strong> (
        {!emailVerified
          ? "Your email isn't verified. Please check your email."
          : 'Your email is verified'}
        )
      </p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default User;
