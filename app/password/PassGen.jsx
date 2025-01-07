import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  Clipboard,
  Share,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { object, number } from "yup";

// Validation schema
let userSchema = object({
  PasswordLength: number()
    .min(4, "Password length should be a minimum of 4")
    .max(16, "Password length should be a maximum of 16")
    .required("Password length is required"),
});

export default function PassGen() {
  const [passwordlength, setpasswordlength] = useState("");
  const [uppercase, setuppercase] = useState(false);
  const [lowercase, setlowercase] = useState(false);
  const [symbol, setsymbol] = useState(false);
  const [number, setnumber] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [error, setError] = useState("");

  const Reset = () => {
    setpasswordlength("");
    setuppercase(false);
    setlowercase(false);
    setsymbol(false);
    setnumber(false);
    setGeneratedPassword("");
    setError("");
  };

  const generatePassword = (passwordlength) => {
    try {
      userSchema.validateSync({ PasswordLength: passwordlength });

      const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowerChars = "abcdefghijklmnopqrstuvwxyz";
      const numberChars = "0123456789";
      const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";
      let characterPool = "";

      if (uppercase) characterPool += upperChars;
      if (lowercase) characterPool += lowerChars;
      if (number) characterPool += numberChars;
      if (symbol) characterPool += symbolChars;

      if (characterPool === "") {
        console.log(
          "Please select at least one option for password generation."
        );
        return;
      }

      let password = "";
      for (let i = 0; i < passwordlength; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
      }

      setGeneratedPassword(password);
    } catch (error) {
      setError(error.message); // Set validation error message
    }
  };

  const handleCopy = () => {
    if (generatedPassword) {
      Clipboard.setString(generatedPassword);
      Alert.alert(
        "Password Copied",
        "The password has been copied to the clipboard."
      );
    }
  };

  const handleShare = async () => {
    if (generatedPassword) {
      try {
        await Share.share({
          message: `Your generated password: ${generatedPassword}`,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Password Generator</Text>

        {/* Password Length Input */}
        <TextInput
          style={styles.input}
          value={passwordlength}
          onChangeText={setpasswordlength}
          placeholder="Enter password length"
          keyboardType="numeric"
        />
        {error && passwordlength.length > 0 && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* Checkbox Options */}
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            isChecked={uppercase}
            disableText
            fillColor="green"
            size={40}
            iconStyle={styles.checkboxIcon}
            onPress={() => setuppercase(!uppercase)}
          />
          <Text style={styles.checkboxLabel}>Uppercase</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            isChecked={lowercase}
            disableText
            fillColor="blue"
            size={40}
            iconStyle={styles.checkboxIcon}
            onPress={() => setlowercase(!lowercase)}
          />
          <Text style={styles.checkboxLabel}>Lowercase</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            isChecked={number}
            disableText
            fillColor="yellow"
            size={40}
            iconStyle={styles.checkboxIcon}
            onPress={() => setnumber(!number)}
          />
          <Text style={styles.checkboxLabel}>Numbers</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            isChecked={symbol}
            disableText
            fillColor="orange"
            size={40}
            iconStyle={styles.checkboxIcon}
            onPress={() => setsymbol(!symbol)}
          />
          <Text style={styles.checkboxLabel}>Symbols</Text>
        </View>

        {/* Display Generated Password */}
        {generatedPassword ? (
          <View style={styles.generatedPasswordContainer}>
            <Text style={styles.generatedPassword}>
              Generated Password: {generatedPassword}
            </Text>
            <TouchableOpacity onPress={handleCopy}>
              <Text style={styles.actionText}>Copy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare}>
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Reset}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Generate and Reset Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => generatePassword(Number(passwordlength))}
          >
            <Text style={styles.buttonText}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={Reset}>
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#f0f8ff",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2a9d8f",
  },
  input: {
    height: 50,
    width: "80%",
    margin: 12,
    borderWidth: 1,
    borderColor: "#2a9d8f",
    padding: 10,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxIcon: {
    borderWidth: 2,
    borderRadius: 25,
  },
  checkboxLabel: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "600",
    color: "#333",
  },
  generatedPasswordContainer: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 15,
    width: "90%",
    marginBottom: 20,
  },
  generatedPassword: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    color: "#0077b6",
    padding: 5,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  generateButton: {
    backgroundColor: "#2a9d8f",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "45%",
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
