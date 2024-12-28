import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Searchbar from "@/components/Searchbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      <Searchbar withHorizontalPadding={false} />
      <Text style={styles.title}>Categories </Text>
      <View style={styles.listContainer}>
        {newsCategoryList.map((item) => (
          <Text key={item.id}> {item.title} </Text>
        ))}
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: Colors.black,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
});
