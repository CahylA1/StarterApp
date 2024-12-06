import { View, Text, StyleSheet, Alert, FlatList} from 'react-native'
import { useState, useEffect } from "react";
import Title from '../components/ui/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from "@expo/vector-icons";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max-min)) + min

  if(rndNum === exclude) {
    return generateRandomBetween(min,max, exclude)
  } else {
    return rndNum
  }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen({userNumber, onGameOver}) {
  const initialGuess = generateRandomBetween(
    1,
    100,
    userNumber
  );

  // State 
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
      if (currentGuess === userNumber) {
        onGameOver();
      }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
      minBoundary = 1
      maxBoundary = 100
    }, [])

  function nextGuessHandler(direction) {
    // direction => 'lower, 'greater'
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
      ){
        Alert.alert("Don't lie", "You know that this is wrong...", {
          text: "Sorry!",
          style: "cancel",
        });
        return
      }


      if (direction === "lower") {
        maxBoundary = currentGuess;
      } else {
        minBoundary = currentGuess + 1;
      }
    console.log(minBoundary, maxBoundary)
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
    setCurrentGuess(newRndNumber);
    setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
  }


    return (
      <View style={styles.screen}>
        <Title>Opponents Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
          <InstructionText style={styles.instructionText}>
            Higher or Lower
          </InstructionText>
          <View style={styles.btnsContainer}>
            <View style={styles.btnContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                +
              </PrimaryButton>
            </View>
            <View style={styles.btnContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                {/* <Ionicons name='md-remove' size={24} color="white"/> */}-
              </PrimaryButton>
            </View>
          </View>
        </Card>
        <View>
          {/* {guessRounds.map(guessRound =><Text key={guessRound}>{guessRound}</Text>)} */}
          <FlatList
            data={guessRounds}
            renderItem={(itemData) => <Text>{itemData.item}</Text>}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding:24,
    },
    btnsContainer:{
      flexDirection: 'row'
    },
    btnContainer:{
      flex:1
    },
    instructionText: {
      marginBottom: 12
    }
})