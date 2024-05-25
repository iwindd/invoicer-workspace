import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
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
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [isFetching, setIsFetching] = React.useState<boolean>(true);

  const SignIn = async (email: string, password: string) => {
    try {
      const resp = await axios.post("/auth/login", { email, password });
      if ((resp.status = 200)) {
        setCookie("accessToken", resp.data.access_token);
      } else {
        throw Error(resp.statusText);
      }
    } catch (error) {
      return false;
    }

    return true;
  };

  const Logout = async () => {
    try {
      removeCookie("accessToken");
      setUserData(null);

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    console.log(cookie.accessToken);
    
    if (cookie.accessToken) {
      setIsFetching(true);
      console.log('start');
      
      axios
        .get("/auth/user")
        .then((resp) => {
          setUserData(resp.data as UserData);
          console.log('ok');
          
        })
        .catch(() => {
          setUserData(null);
          console.log('not found');
          
        })
        .finally(() => {
          setIsFetching(false);
          console.log('set fetching to false');
          
        });
    }
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
