import { useNavigation, useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  if (!places) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>
          You have no places added. Start adding some!!!
        </Text>
      </View>
    );
  }

  const navigation = useNavigation();

  function placeDetail(id) {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          place={itemData.item}
          onPress={placeDetail.bind(this, itemData.item.id)}
        />
      )}
      style={styles.list}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
