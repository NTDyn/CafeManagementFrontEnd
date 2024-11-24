import * as React from 'react';
import { useSelector } from 'react-redux';
const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const user = useSelector(state => state.sessionLogin)
  return (
    <UserContext.Provider value={{user}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
