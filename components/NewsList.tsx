import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";

type Props = {
  newsList: Array<NewsDataType>;
};

export default function NewsList({ newsList }: Props) {
  return (
    <View style={styles.container}>
      {newsList.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Image source={{ uri: item.image_url }} style={styles.itemimg} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <View style={styles.itemSourceInfo}>
              <Image
                source={{ uri: item.source_icon }}
                style={styles.itemSourceImg}
              />
              <Text style={styles.itemSouceName}>{item.source_name}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    flex: 1,
  },
  itemimg: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: "capitalize",
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.black,
  },
  itemSourceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemSouceName: {
    fontSize: 10,
    fontWeight: "400",
    color: Colors.darkGrey,
  },
  itemSourceImg: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});
