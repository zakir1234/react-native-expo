import { View, Text, Pressable } from "react-native";
import React from "react";
import { Order, OrderStatusList } from "@/types";
import Colors from "@/constants/Colors";

type OrderListFooterProps = {
  item: Order;
};

const OrderListFooter = ({ item }: OrderListFooterProps) => {
  //   const { mutate: updateOrder } = useUpdateOrder();

  //   const updateStatus = async (status: string) => {
  //     await updateOrder({
  //       id: id,
  //       updatedFields: { status },
  //     });
  //     if (order) {
  //       await notifyUserAboutOrderUpdate({ ...order, status });
  //     }
  //   };

  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>Status</Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        {OrderStatusList.map((status) => (
          <Pressable
            key={status}
            onPress={() => console.log("updating status")}
            style={{
              borderColor: Colors.light.tint,
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              marginVertical: 10,
              backgroundColor:
                item.status === status ? Colors.light.tint : "transparent",
            }}
          >
            <Text
              style={{
                color: item.status === status ? "white" : Colors.light.tint,
              }}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default OrderListFooter;
