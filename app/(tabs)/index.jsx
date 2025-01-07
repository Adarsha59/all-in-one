import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import homepageimage from "../../assets/images/home.png"; // Ensure this path is correct
import { useRouter } from "expo-router";

export default function Tab() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={homepageimage} />
        </View>
        <View style={styles.secondContainer} resizeMode="cover">
          <Text style={styles.titleText}>TODO APP</Text>
          <TouchableOpacity
            style={styles.textview}
            onPress={() => router.push("/todo/mainpage")}
          >
            <Text style={styles.subtitleText}>Begin!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: Dimensions.get("window").width, // Full screen width
    height: Dimensions.get("window").height * 0.6, // 60% of screen height
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  secondContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
    color: "blue",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  textview: {
    backgroundColor: "#a68c41",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
    textAlign: "center",
    letterSpacing: 1.2,
  },
});
