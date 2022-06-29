import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

const Map = ({ navigation, route }) => {
  const initialMarker = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng,
  };

  const [marker, setMarker] = useState(initialMarker);

  const markerHandler = (event) => {
    if (initialMarker) return;
    // console.log(event.nativeEvent);
    setMarker({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  const onSave = useCallback(() => {
    if (initialMarker) return;

    if (!marker) {
      Alert.alert("No Place Selected", "Please select a location first");
      return;
    }
    navigation.navigate("AddPlaces", {
      markerLocation: marker,
    });
    console.log(marker);
  }, [navigation, marker]);

  useLayoutEffect(() => {
    if (initialMarker) return;

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton name="save" color={tintColor} size={24} onPress={onSave} />
      ),
    });
  }, [navigation, onSave]);

  return (
    <MapView
      initialRegion={{
        latitude: initialMarker ? initialMarker.lat : 26.7723089,
        longitude: initialMarker ? initialMarker.lng : 80.9387055,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      style={styles.map}
      onPress={markerHandler}
    >
      {marker && (
        <Marker
          title="Your Location"
          coordinate={{ latitude: marker.lat, longitude: marker.lng }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
