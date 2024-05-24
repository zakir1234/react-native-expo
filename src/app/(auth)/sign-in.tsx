import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { isEmpty } from "@/constants/utility";

const CreateProductScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  const validateInput = () => {
    setErrors("");
    if (!email) {
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

      <Text style={styles.label}>Username</Text>
      <TextInput
        onChangeText={setEmail}
        placeholder="example@gmail.com"
        value={email}
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="9.99"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text={"Sign In"} onPress={onCreate} />

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
