import React, { createContext, useContext, ReactNode, useEffect } from "react";
import axios from "../libs/axios";

export interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  permission: number;
}

interface AuthData {
  SignIn: (email: string, password: string) => Promise<boolean>;
  Logout: () => Promise<boolean>;
  userData: UserData | null;
  isFetching: boolean;
}

const AuthContext = createContext<AuthData | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);

  const SignIn = async (email: string, password: string) => {
    try {
      const resp = await axios.post("/auth/login", { email, password });
      if (resp.status != 200) {
        throw Error(resp.statusText);
      }

      setUserData(resp.data);
    } catch (error) {
      return false;
    }

    return true;
  };

  const Logout = async () => {
    try {
      const resp = await axios.post("/auth/logout");
      
      if (resp.status == 200){
        setUserData(null);
        return true;
      }else{
        throw new Error(resp.statusText)
      }

    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    setIsFetching(true);
      
    axios
      .get("/auth/user")
      .then((resp) => {
        setUserData(resp.data as UserData);
      })
      .catch(() => {
        setUserData(null);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        Logout,
        userData,
        isFetching
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
