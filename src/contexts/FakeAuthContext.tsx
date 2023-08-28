import React, { createContext, useContext, useReducer } from 'react';
import { UserType } from '../types/UserType';

type AuthContextType = {
  login: (email: string, password: string) => boolean;
  logout: () => void;
  user: UserType | null;
};

/**
 * Context for authentication-related data and functions.
 */
const AuthContext = createContext<AuthContextType | null>(null);

type State = {
  isAuthenticated: boolean;
  user: UserType | null;
};

const initialState: State = {
  isAuthenticated: false,
  user: { name: '', email: '', password: '', avatar: '' },
};

type Action = { type: 'login'; payload: UserType } | { type: 'logout' };

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case 'logout':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      throw new Error('Unknown Action');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

type AuthProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides an authentication context to child components.
 *
 * @param {React.ReactNode} children Child components that will have access to the AuthContext.
 */
function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Checks a user's login credentials to see if they're authenticated.
   * A fake user is being used and will be the only user for this application.
   * @param email The user's email.
   * @param password The user's password.
   */
  function login(email: string, password: string) {
    // On success:
    if (FAKE_USER.email === email && FAKE_USER.password === password) {
      dispatch({ type: 'login', payload: FAKE_USER });
      return true;
    } else {
      return false;
    }
  }

  /**
   * Logs a user out.
   */
  function logout() {
    dispatch({ type: 'logout' });
  }

  const value = {
    login,
    logout,
    user: state.user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to provide access to the AuthContext.
 * Throws an error if used outside of the AuthProvider component.
 *
 * Provides access to the AuthContext. When called, this hook returns:
 * - login: Checks where user credentials are correct then logs the user in
 * - logout: Logs the user out
 * - user: Either the currently logged in user or null
 */
function useAuth() {
  const context = useContext(AuthContext);
  if (context == null)
    throw new Error('AuthContext was used outside the AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
