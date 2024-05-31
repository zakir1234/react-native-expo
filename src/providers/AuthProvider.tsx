import { createContext, useContext, useEffect, useState } from "react";
import base from "../constants/server";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (mobileNo: string, password: string) => Promise<any>;
  onLogin?: (mobileNo: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "access_token";
const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      //  console.log("stored", token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token: token, authenticated: true });
      }
    };

    loadToken();
  }, []);

  const register = async (mobileNo: string, password: string) => {
    try {
      return await axios.post(base.fullUrl + "/app/public/sign-in", {
        mobileNo,
        password,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (mobileNo: string, password: string) => {
    try {
      const result = await axios.post(base.fullUrl + "/app/public/sign-in", {
        mobileNo,
        password,
      });

      setAuthState({ token: result.data.access_token, authenticated: true });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.access_token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.access_token);
      return result;
    } catch (e) {
      setAuthState({ token: null, authenticated: false });
      axios.defaults.headers.common["Authorization"] = "";

      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: true,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}></AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};
