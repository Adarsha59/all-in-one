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
import aboutImage from "../../assets/about.jpg"; // You can replace this with any image relevant to the "About" page
import { useRouter } from "expo-router";

export default function About() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={aboutImage} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Who Am I?</Text>
        <Text style={styles.bodyText}>
          Hello! I'm Adarsha Paudyal, a passionate and driven individual with a
          keen interest in Web and App Development. With a strong background in
          engineering, I strive to bridge the gap between technology and
          innovation, creating impactful solutions that make a difference. This
          page is a reflection of my journey, showcasing the projects I’ve
          worked on and the insights I’ve gained along the way. I hope you find
          it inspiring and valuable as I continue to evolve in the world of
          development!
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/")} style={styles.button}>
        <Text style={styles.buttonText}>Go Back Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: Dimensions.get("window").width - 40,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  textContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
