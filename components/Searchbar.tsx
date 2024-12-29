import { View, StyleSheet, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  withHorizontalPadding: boolean;
  setSearchQuery: Function;
};

export default function Searchbar({
  withHorizontalPadding,
  setSearchQuery,
}: Props) {
  return (
    <View
      style={[
        styles.container,
        withHorizontalPadding && { paddingHorizontal: 20 },
      ]}
    >
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={Colors.lightGrey} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor={Colors.lightGrey}
          style={styles.searchTxt}
          autoCapitalize="none"
          onChangeText={query => setSearchQuery(query)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchTxt: {
    fontSize: 14,
    flex: 1,
  },
  searchIcon: {
    color: Colors.lightGrey,
  },
});
