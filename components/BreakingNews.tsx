import { View, Text, StyleSheet, FlatList, Animated } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import {
  useSharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

type Props = {
  newList: Array<NewsDataType>;
};

export default function BreakingNews({ newList }: Props) {
  const [data, setData] = useState(newList);
  const [paginnation, setPaginnation] = useState(0);
  const ScrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      ScrollX.value = e.contentOffset.x;
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <SliderItem sliderItem={item} index={index} scrollX={ScrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={onScrollHandler}
          scrollEventThrottle={16}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginLeft: 20,
    marginBottom: 10,
    color: Colors.black,
  },
  slideWrapper: {
    justifyContent: "center",
  },
});
