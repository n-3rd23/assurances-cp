import { NextRouter, useRouter } from "next/router";
import { createContext, useState } from "react";
import { auth } from "../firebase/firebase.util";

type ContextProps = {
  authState: {
    currentUser: object;
  };
  setAuthState: (authInfo: any) => void;
  logout: () => void;
};

const AuthContext = createContext<Partial<ContextProps>>({});
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const router: NextRouter = useRouter();
  const [authState, setAuthState] = useState(null);

  const logout = () => {
    auth.signOut();
    setAuthState(null);
    router.replace("/admin/login");
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo: any) => setAuthState(authInfo),
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
