import { useState } from "react";
import Colors from "../constants/colors";
import { TextInput, View, StyleSheet, Alert,Text } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNum, setEnteredNum] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNum(enteredText);
  }
  function resetInputHandler() {
    setEnteredNum("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNum);
    // shows invalid number and creates an alert to user 
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show alert...
      Alert.alert(
        "Invalid Number!",
        "Number has to be a number between 1 and 99.",
        // Array will implement the button to the alert
        //onPress allows you to reset to the function of your choice
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    // Prop implemented from parent App.js componennt
    //allows Start game screen to go over to game screen if number is valid 
    onPickNumber(chosenNumber);
  }

  return (
    <View style={styles.rootContiainer}>
      <Title>Guess My Number</Title>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput
          style={styles.numInput}
          maxLength={2} // Max amount of Characters
          keyboardType="number-pad" // Auto brings up only Keyboard pad
          autoCapitalize="none" // Disables auto Cap
          autoCorrect={false} // disables auto correct
          onChangeText={numberInputHandler}
          value={enteredNum}
        />
        <View style={styles.btnsContainer}>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  
  rootContiainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  numInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  btnsContainer: {
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
  },
});
