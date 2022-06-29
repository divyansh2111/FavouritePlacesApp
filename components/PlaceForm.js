import { ScrollView, StyleSheet, TextInput, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Buttons from "../components/UI/Buttons";
import { Place } from "../models/places";

const PlaceForm = ({ addPlace }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [location, setLocation] = useState();

  function imageHandler(imageUri) {
    setImage(imageUri);
  }

  const locationHandler = useCallback(
    (loc) => {
      setLocation(loc);
    },
    [setLocation]
  );

  const addPlaceHandler = () => {
    // console.log(title, image, location);
    const place = new Place(title, image, location);
    addPlace(place);
  };

  return (
    <ScrollView style={styles.form}>
      <Text style={styles.title}>Title</Text>
      <TextInput style={styles.input} onChangeText={(data) => setTitle(data)} />
      <ImagePicker getImage={imageHandler} />
      <LocationPicker getLocation={locationHandler} />
      <Buttons onPress={addPlaceHandler}>Add Place</Buttons>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
    // marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
