import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginTop: 36,
        backgroundColor: Colors.primary700,
        marginHorizontal: 24,
        borderRadius: 8,
        elevation: 4, // Andriod Only Concept
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 }, //lets you control the shadow offset from left to right ** iOS only
        shadowRadius: 6, // controls how much the shadow expands
        shadowOpacity: 0.25, // control how transparent a shadow is
      }
})