import React, { createContext, useContext, ReactNode, useEffect } from "react";
import axios from "../libs/axios";
import { useQuery } from "@tanstack/react-query";
import { useInterface } from "./InterfaceProvider";

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
  const {data: userData, refetch: getUserData, isLoading: isFetching} = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      return (await axios.get("/auth/user")).data;
    }
  })

  const SignIn = async (email: string, password: string) => {
    try {
      const resp = await axios.post("/auth/login", { email, password });
      if (resp.status != 200) {
        throw Error(resp.statusText);
      }

      await getUserData()
    } catch (error) {
      return false;
    }

    return true;
  };

  const Logout = async () => {
    try {
      const resp = await axios.post("/auth/logout");
      
      if (resp.status == 200){
        await getUserData()
        return true;
      }else{
        throw new Error(resp.statusText)
      }

    } catch (error) {
      return false;
    }
  };

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
