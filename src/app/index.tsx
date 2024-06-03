import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect, router } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
// import { supabase } from "@lib/supabase";

const index = () => {
  const { authState, onLogout } = useAuth();

  async function handleSignOut() {
    try {
      const result = await onLogout!();
      return <Redirect href={"/"} />;
    } catch (e) {
      console.log(e);
    }
  }

  // const { session, loading, isAdmin } = useAuth();

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  if (!authState?.authenticated) {
    return <Redirect href={"/sign-in"} />;
  }

  if (authState.roles != null) {
    if (authState.roles[0] == "ROLE_USER") {
      return <Redirect href={"/(user)"} />;
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>

      <Link href={"/(auth)/sign-in"} asChild>
        <Button text="Sign In" />
      </Link>

      <Button onPress={handleSignOut} text="Sign out" />
    </View>
  );
};

export default index;
