import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Detials = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Detials {id}</Text>
    </View>
  );
};

export default Detials;

const styles = StyleSheet.create({});
