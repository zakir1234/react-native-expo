import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { title } from "process";
import orders from "@assets/data/orders";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/cartProvider";
import { PizzaSize } from "@/types";
import OrderListItem from "@/components/OrderListItem";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListFooter from "@/components/OrderListFooter";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const order = orders.find((p) => p.id.toString() === id);
  const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
  const addToCart = () => {
    if (!order) return;
    // addItem(order, selectedSize);
    router.push("/cart");
  };

  if (!order) {
    return <Text>Order Not Found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        // ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, gap: 10, flex: 1 },
  image: { width: "100%", aspectRatio: 1 },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    // backgroundColor: "#ddd",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: { fontSize: 20, fontWeight: "500" },
});

export default OrderDetailsScreen;
