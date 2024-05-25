import React, { createContext, useContext, ReactNode, useEffect } from "react";

interface UserData {
  id: number;
  firstname: string;
  lastname: string;
  permission: number;
}

interface AuthData {
  SignIn: (email: string, password: string) => Promise<boolean>;
  userData: UserData | null;
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

  const SignIn = async (email: string, password: string) => {
    try {
      if (email == "1234@gmail.com" && password == "12341234") {
        const resp = {
          id: 1,
          firstname: "invoicer",
          lastname: "invoicer_",
          permission: 0,
        };

        setUserData(resp);

        return true;
      }

      throw Error("invalid_user");
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData])

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
