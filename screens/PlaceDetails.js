import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { searchPlaces } from "../utils/database";

const PlaceDetails = ({ route, navigation }) => {
  const [place, setPlace] = useState();
  const placeId = route.params.placeId;
  // console.log("ID", placeId);

  useEffect(() => {
    async function loadPlace() {
      const _place = await searchPlaces(placeId);
      navigation.setOptions({
        title: _place.title,
      });
      setPlace(_place);
    }

    loadPlace();
  }, [placeId]);

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Details...</Text>
      </View>
    );
  }

  function getPlaceDetails() {
    navigation.navigate("Map", {
      initialLat: place.location.lat,
      initialLng: place.location.lng,
    });
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton name="map" onPress={getPlaceDetails}>
          View On Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "35%",
    width: "100%",
    minHeight: 300,
  },
  locContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
