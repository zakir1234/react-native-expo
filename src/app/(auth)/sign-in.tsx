import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import Colors from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";

const CreateProductScreen = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();
  const netInfo = useNetInfo();

  if (loading) {
    return <ActivityIndicator />;
  }

  async function handleSignIn() {
    if (!validateInput()) {
      return;
    }

    if (!netInfo.isConnected) {
      setErrors("Please check your internet connection");
      return false;
    }

    setLoading(true);

    try {
      setLoading(true);
      const result = await onLogin!(mobileNo, password);
      if (result.error) {
        setErrors(result.msg);
      }

      console.log("from sign in : ", result);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  const resetFields = () => {
    setMobileNo("");
    setPassword("");
  };

  const validateInput = () => {
    setErrors("");
    if (!mobileNo) {
      setErrors("Mobile No is required");
      return false;
    }

    if (!password) {
      setErrors("Password is required");
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Sign In",
        }}
      />

      <Text style={styles.label}>Mobile No</Text>
      <TextInput
        onChangeText={setMobileNo}
        placeholder="01XXXXXXXXX"
        value={mobileNo}
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="******"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text={"Sign In"} onPress={handleSignIn} />

      <Link href="/sign-up" asChild>
        <Text style={styles.textButton}>Create An Account</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },

  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: { color: "gray", fontSize: 16 },
  image: { width: "50%", aspectRatio: 1, alignSelf: "center" },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
