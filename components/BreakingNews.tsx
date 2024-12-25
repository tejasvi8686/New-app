import {
  View,
  Text,
  StyleSheet,
  ViewToken,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import Animated, {
  useSharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  scrollTo,
} from "react-native-reanimated";
import Pagination from "@/components/Pagination";

type Props = {
  newList: Array<NewsDataType>;
};

export default function BreakingNews({ newList }: Props) {
  const [data, setData] = useState(newList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const ScrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const { width } = useWindowDimensions();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      ScrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay) {
      interval.current = setInterval(() => {
        offset.value = offset.value + width;
      }, 5000);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isAutoPlay, width, offset]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].item !== undefined
    ) {
      setPaginationIndex(viewableItems[0].index % newList.length);
    }
  };

  const onViewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    { onViewabilityConfig, onViewableItemsChanged },
  ]);

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
          onEndReached={() => setData([...data, ...newList])}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          onScrollBeginDrag={() => {
            setIsAutoPlay(false);
          }}
          onScrollEndDrag={() => {
            setIsAutoPlay(true);
          }}
        />
        <Pagination
          items={newList}
          ScrollX={ScrollX}
          PaginationIndex={paginationIndex}
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
    textAlign: "left",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    color: Colors.black,
  },
  slideWrapper: {
    justifyContent: "center",
  },
});
