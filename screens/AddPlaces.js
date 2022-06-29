import { StyleSheet } from "react-native";
import React from "react";
import PlaceForm from "../components/PlaceForm";
import { insertPlaces } from "../utils/database";

const AddPlaces = ({ navigation }) => {
  const addPlaceHandler = async (placeData) => {
    await insertPlaces(placeData);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm addPlace={addPlaceHandler} />;
};

export default AddPlaces;

const styles = StyleSheet.create({});
