import { View, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { title } from "process";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ title: "Details of id: " + id }} />
      <Text>ProductDetailsScreen: {id}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
