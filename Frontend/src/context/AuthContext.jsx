// src/context/AuthContext.jsx
import { createContext } from 'react';
import { useSelector } from 'react-redux';

export const AuthContext = createContext({ isAuthenticated: false, user: null });

export function AuthProvider({ children }) {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}