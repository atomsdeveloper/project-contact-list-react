/* eslint-disable react-refresh/only-export-components */
import React from "react";

// Types
import P from "prop-types";

const AuthContext = React.createContext();

// Hook to access auth
export const useAuthContext = () => {
  return React.useContext(AuthContext);
};

// Provider
export const AuthProvider = ({ children }) => {
  const [hasUser, setHasUser] = React.useState(() => {
    // Inicializa com o valor do sessionStorage
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  return (
    <AuthContext.Provider value={{ hasUser, setHasUser }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: P.node.isRequired,
};
