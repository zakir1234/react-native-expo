import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { isEmpty } from "@/constants/utility";
import base from "../../constants/server";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/providers/AuthProvider";
import { isLoaded } from "expo-font";

const CreateProductScreen = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  // const [loading, setLoading] = useState(false);
  const { onLogin } = useAuth();

  async function handleSignIn() {
    // setLoading(true);

    //var data = { mobileNo, password };

    if (!mobileNo || !password) {
      return;
    }

    try {
      //setLoading(true);
      const result = await onLogin!(mobileNo, password);
      // setLoading(false);
    } catch (e) {
      console.log(e);
      //  setLoading(false);
    }

    //onLogin!(mobileNo, password);

    // axios
    //   .post(base.fullUrl + "/app/public/access_token", data)
    //   .then((response) => {
    //     SecureStore.setItem("token", response.data.access_token);
    //     console.log(SecureStore.getItem("token"));
    //     console.log("from api", response.data.access_token);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     SecureStore.deleteItemAsync("token");
    //     setErrors(error?.response?.data);
    //     setLoading(false);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    // const token = SecureStore.getItem("token");
  }

  const register = () => {};

  const resetFields = () => {
    setMobileNo("");
    setPassword("");
  };

  const validateInput = () => {
    setErrors("");
    if (!mobileNo) {
      setErrors("Email is required");
      return false;
    }

    if (!password) {
      setErrors("Password is required");
      return false;
    }

    return true;
  };

  const onUpdate = () => {
    if (!validateInput()) {
      return;
    }

    console.log("Updating Product");
    resetFields();
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    console.log("Creating Product");
    resetFields();
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
