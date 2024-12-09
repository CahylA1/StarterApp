import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient'
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen'
import Colors from './constants/colors';
import { useFonts } from "expo-font";
import AppLoading from 'expo-app-loading'

export default function App() {
  // State
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0)

  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),

  })

  if(!fontsLoaded){
    return <AppLoading />
  }

  // Functions 
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false)
  }
  
  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  }

  function startNewGameHandler() {
    setUserNumber(null)
    setGuessRounds(0)
  }

  // stores the StartGameScreen component inside of a variable
  // that allows you to hard code into the app as a component using destructering
  // & allows you set a prop inside of the StartGameScreen component to
  //  use your pickedNumberHandler function
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  // uses the initiated state value 'userNumber' and checks if number is a valid number
  // if number is valid it fowards you to the game screen component
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    // Add a Gradient with Expo package (expo install expo-linear-gradient) to use multiple colors for background and other
    //elements
    <LinearGradient
      colors={[Colors.primary800, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/dices.png")}
        resizeMode="cover"
        // Adds style to the view
        style={styles.rootScreen}
        // Adds style to the Image
        imageStyle={styles.backgroundImage}
      >
        {/* Safe area view allows you to keep contact under the top of your device without 
        using styling  */}
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15
  }
});
