import { createContext, useContext, useEffect, useState } from "react";
import base from "../constants/server";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import URL from "@/constants/URL";
import { router } from "expo-router";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    roles: string[] | null;
  };
  onRegister?: (mobileNo: string, password: string) => Promise<any>;
  onLogin?: (mobileNo: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "key";
const ROLE_KEY = "roles";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    roles: string[] | null;
  }>({
    token: null,
    authenticated: null,
    roles: [],
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      //  console.log("stored", token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
          roles: new Array(JSON.stringify(SecureStore.getItemAsync(ROLE_KEY))),
        });
      }
    };

    loadToken();
  }, []);

  const register = async (mobileNo: string, password: string) => {
    try {
      return await axios.post(base.fullUrl + URL.LOGIN, {
        mobileNo,
        password,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (mobileNo: string, password: string) => {
    try {
      const result = await axios.post(base.fullUrl + URL.LOGIN, {
        mobileNo,
        password,
      });

      setAuthState({
        token: result.data.key,
        authenticated: result.data.authenticated,
        roles: result.data.roles,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.key}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.key);
      await SecureStore.setItemAsync(ROLE_KEY, result.data.roles[0]);
      return result;
    } catch (e) {
      setAuthState({ token: null, authenticated: false, roles: [] });
      axios.defaults.headers.common["Authorization"] = "";
      console.log("catch executed", (e as any).response.data);
      return { error: true, msg: (e as any).response.data };
    }
  };

  const logout = async () => {
    SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
      roles: [],
    });

    router.replace("/");
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
