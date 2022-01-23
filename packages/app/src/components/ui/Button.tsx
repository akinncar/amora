import React, { Suspense } from "react";
import { TouchableOpacity, Text, GestureResponderEvent } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
};

export function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: "#000",
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Text style={{ color: "#FFF" }}>{title}</Text>
    </TouchableOpacity>
  );
}
