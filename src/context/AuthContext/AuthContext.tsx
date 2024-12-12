

import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);
export default function AuthContextProvider({ children }) {
  const [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    const encodeToken = localStorage.getItem('token');
    const decodeToken = jwtDecode(encodeToken);
    setLoginData(decodeToken);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveLoginData();
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ loginData, saveLoginData }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
