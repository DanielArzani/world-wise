import React, { createContext, useContext, useReducer } from 'react';
import { UserType } from '../types/UserType';

/**
 * Context for authentication-related data and functions.
 */
const AuthContext = createContext(null);

type State = {
  isAuthenticated: boolean;
  user: UserType | null;
};

const initialState: State = {
  isAuthenticated: false,
  user: { email: '', password: '' },
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
      return state;
  }
}

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
    // Here, you might make an API call or fake the authentication.
    // On success:
    dispatch({ type: 'login', payload: { email, password } }); // Storing only email for this example.
  }

  /**
   * Logs a user out.
   */
  function logout() {
    dispatch({ type: 'logout' });
  }

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to provide access to the AuthContext.
 * Throws an error if used outside of the AuthProvider component.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context == null)
    throw new Error('AuthContext was used outside the AuthProvider');

  return context;
}

export { AuthProvider };
