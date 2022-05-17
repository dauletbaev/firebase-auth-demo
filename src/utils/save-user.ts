import type { User } from 'firebase/auth';

export async function saveUser(user: User, name: string) {
  const jwtToken = await user.getIdToken();

  const userData = {
    uid: user.uid,
    email: user.email ?? '',
    emailVerified: user.emailVerified,
    name: user.displayName ?? name,
    token: jwtToken,
  };

  localStorage.setItem('user', JSON.stringify(userData));

  return userData;
}
