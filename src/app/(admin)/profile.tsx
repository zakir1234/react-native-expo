import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { isEmpty } from "@/constants/utility";

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "@/providers/AuthProvider";

const CreateProfileScreen = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const { onLogout } = useAuth();

  async function handleSignOut() {
    try {
      const result = await onLogout!();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Profile",
        }}
      />

      <Button text={"Sign Out"} onPress={handleSignOut} />
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

export default CreateProfileScreen;
