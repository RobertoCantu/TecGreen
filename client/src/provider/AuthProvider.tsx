import React, { useState, useEffect } from 'react';
import { createContext } from "react";
import { clearToken, getToken } from '../utils/token';

type authContextStateType = {
  type?: string[],
  isLoggedIn: boolean,
  isLoading: boolean,
}

type authContextType = {
  authContext: authContextStateType,
  login: (type: string[]) => void,
  logout: () => void,
}

interface Props {
  children: React.ReactNode;
}

const defaultContextValues: authContextType = {
  authContext: { type: [''], isLoggedIn: false, isLoading: true },
  login: () => {},
  logout: () => {},
}

// Context
export const UserContext = createContext<authContextType>(defaultContextValues);

// Provider
export const AuthProvider: React.FC<Props> = ({ children }) => {
  
  const [authContext, setAuthContext] = useState<authContextStateType>(defaultContextValues.authContext);

  const login = (type : string[]) => {
    setAuthContext(_ => ({
      type,
      isLoggedIn: true,
      isLoading: false,
    }));
  };

  const logout = () => {
    clearToken();
    setAuthContext(_ => ({
      type: [''],
      isLoggedIn: false,
      isLoading: false,
    }));
  };

  useEffect(() => {
    if(getToken()) { // If there's already a Token in storage we validate it
      // TODO: uncomment get setting server
      /*http.getUserType().then(type => {
        if(!type) {
          clearToken();
          setAuthContext({type:undefined, isLoggedIn: false, isLoading: false})
        }else{
          setAuthContext({type:type, isLoggedIn: true, isLoading: false})
        }
      })*/
    }else{
      setAuthContext({type:undefined, isLoggedIn: false,  isLoading: false})
    }

  }, []);

  return (
    <UserContext.Provider value={{ authContext, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}