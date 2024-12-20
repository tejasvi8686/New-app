import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/getting-started.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      />
      <Text>Welcome Page</Text>
      <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
        <Text style={{ color: "blue" }}>Go to Tabs</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
