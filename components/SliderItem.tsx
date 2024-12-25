import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { SharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  sliderItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("window");

export default function SliderItem({ sliderItem, index, scrollX }: Props) {
  return (
    <View style={styles.itemWrapper}>
      <Image source={{ uri: sliderItem.image_url }} style={styles.image} />
      <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.gradient}>
        <Text>{sliderItem.title}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width-60,
    height: 180,
    borderRadius: 20,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 30,
    right: 0,
    width: width-60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
});
