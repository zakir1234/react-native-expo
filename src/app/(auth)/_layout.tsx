import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

const AuthLayout = () => {
  const { authState } = useAuth();

  if (authState?.authenticated) {
    return <Redirect href={"/"} />;
  }

  return <Stack />;
};

export default AuthLayout;
