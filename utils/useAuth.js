// ~/composables/useAuth.js
import { ref } from 'vue';

export const useUser = () => useState('user', () => null);
export const useToken = () => useState('token', () => null);

export function useAuth() {
  const user = useUser();
  const token = useToken();

  const isLoggedIn = () => !!token.value;

  const setAuth = (authUser, authToken) => {
    user.value = authUser;
    token.value = authToken;

    if (process.client) {
      localStorage.setItem('user', JSON.stringify(authUser));
      localStorage.setItem('token', authToken);
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;

    if (process.client) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return { user, token, isLoggedIn, setAuth, logout };
}
