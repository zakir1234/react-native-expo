import { View, FlatList, Text } from "react-native";
import orders from "assets/data/orders";
import OrderListItem from "@components/OrderListItem";

export default function MenuScreen() {
  return (
    <View>
      {/* <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} /> */}
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  );
}
