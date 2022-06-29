import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";

const PlaceItem = ({ place, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    margin: 4,
    backgroundColor: Colors.primary500,
    elevation: 2,
    borderRadius: 4,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  image: {
    flex: 1,
    height: "100%",
  },
  textContainer: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
  pressed: {
    opacity: 0.9,
  },
});
