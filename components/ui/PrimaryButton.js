import { View, Text, Pressable, StyleSheet} from 'react-native'
import Colors from '../../constants/colors';

function PrimaryButton({children, onPress }) {
    // Testing function 
    //     function pressHandler() {
    //         console.log('Pressed!')
    //     }
    return (
      <View style={styles.btnOuterContainer}>
        <Pressable
          style={({pressed}) => pressed ? [styles.btnInnerContainer, styles.pressed] : styles.btnInnerContainer}
          onPress={onPress}
          android_ripple={{ color: Colors.primary600 }} // adds rippled when pressed 
        >
          <Text style={styles.btnText}>{children}</Text>
        </Pressable>
      </View>
    );
}

export default PrimaryButton

const styles = StyleSheet.create({
  btnOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: 'hidden'
  },
  btnInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75
  }
});