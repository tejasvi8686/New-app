import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated ,{
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";

type Props = {
  sliderItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

export default function SliderItem({ sliderItem, index, scrollX }: Props) {
  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[styles.itemWrapper, rnStyle]}
      key={sliderItem.article_id}
    >
      <Image source={{ uri: sliderItem.image_url }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      >
        <View style={styles.sourceInfo}>
          {sliderItem.source_icon && (
            <Image
              source={{ uri: sliderItem.source_icon }}
              style={styles.sourceIcon}
            />
          )}
          <Text style={styles.sourceName}>{sliderItem.source_name}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {sliderItem.title}
        </Text>
      </LinearGradient>
    </Animated.View>
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
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 30,
    right: 0,
    width: width - 60,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceInfo: {
    flexDirection: "row",
    position: "absolute",
    top: 85,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
  sourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },
  sourceName: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.white,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.white,
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
  },
});
