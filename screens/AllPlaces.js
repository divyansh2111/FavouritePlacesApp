import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import PlacesList from "../components/PlacesList";
import { fetchPlaces } from "../utils/database";

const AllPlaces = () => {
  const [placesList, setPlacesList] = useState([]);
  const focussed = useIsFocused();

  useEffect(() => {
    async function getPlaces() {
      const places = await fetchPlaces();
      setPlacesList(places);
    }

    if (focussed) {
      getPlaces();
    }
  }, [focussed]);

  return <PlacesList places={placesList} />;
};

export default AllPlaces;

const styles = StyleSheet.create({});
