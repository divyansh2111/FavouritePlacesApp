import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "./UI/OutlinedButton";
import { Colors } from "../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { getAddress, getMapPreview } from "../utils/location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

const LocationPicker = ({ getLocation }) => {
  const [coordinates, setCoordinates] = useState();
  const [locationPermissions, setLocationPermissions] =
    useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocussed = useIsFocused();

  useEffect(() => {
    if (isFocussed && route.params) {
      setCoordinates({
        lat: route.params.markerLocation.lat,
        lng: route.params.markerLocation.lng,
      });
    }
  }, [isFocussed, route]);

  useEffect(() => {
    const getloc = async () => {
      if (coordinates) {
        const address = await getAddress(coordinates.lat, coordinates.lng);
        getLocation({ ...coordinates, address: address });
      }
    };

    getloc();
  }, [coordinates, getLocation]);

  async function verifyPermissions() {
    if (
      locationPermissions.status === PermissionStatus.UNDETERMINED ||
      locationPermissions.status === PermissionStatus.DENIED
    ) {
      const response = await setLocationPermissions();

      return response.granted;
    }

    if (locationPermissions.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "The App requires your Location Permissions to work."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const permission = verifyPermissions();

    if (!permission) return;

    const location = await getCurrentPositionAsync();
    setCoordinates({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function getOnMapHandler() {
    navigation.navigate("Map");
  }

  let pickedLocation = <Text>No location picked yet.</Text>;
  if (coordinates)
    pickedLocation = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(coordinates.lat, coordinates.lng) }}
      />
    );

  return (
    <View>
      <View style={styles.mapPreview}>{pickedLocation}</View>
      <View style={styles.actions}>
        <OutlinedButton name="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton name="map" onPress={getOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
