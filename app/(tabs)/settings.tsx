import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const Page = (props: Props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>About</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Send Feedback</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Privacy Policy</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color={Colors.lightGrey}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemBtn} onPress={toggleSwitch} >
          <Text style={styles.itemBtnText}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#3e3e3e" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ transform: [{ scale: 0.6 }], marginBottom: -15, marginRight: -8 }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemBtnText, { color: "red" }]}>Logout</Text>
          <MaterialIcons name="logout" size={16} color={"red"} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
  },
  itemBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
});
