import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, { SharedValue } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

type Props = {
  items: NewsDataType[];
  PaginationIndex: number;
  ScrollX: SharedValue<number>;
};

export default function Pagination({ items, PaginationIndex, ScrollX }: Props) {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        return (
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor:
                  PaginationIndex === index ? Colors.tint : Colors.darkGrey,
              },
            ]}
            key={index}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  dot: {
    backgroundColor: "#333",
    height: 8,
    width: 8,
    borderRadius: 8,
    marginHorizontal: 2,
  },
});
