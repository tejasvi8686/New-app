import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ActivityIndicatorProps,
} from "react-native";
import React from "react";

type Props = {

};

export default function Loading(
  props: React.JSX.IntrinsicAttributes &
    React.JSX.IntrinsicClassAttributes<ActivityIndicator> &
    Readonly<ActivityIndicatorProps>
) {
  return (
    <View style={styles.container}>
      <ActivityIndicator {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
