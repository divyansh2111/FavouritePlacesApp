import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  getCameraPermissionsAsync,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../constants/colors";
import OutlinedButton from "./UI/OutlinedButton";

const ImagePicker = ({ getImage }) => {
  const [imageUri, setImageUri] = useState();
  const [cameraPermissions, setCameraPermissions] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (
      cameraPermissions.status === PermissionStatus.UNDETERMINED ||
      cameraPermissions.status === PermissionStatus.DENIED
    ) {
      const response = await setCameraPermissions();

      return response.granted;
    }

    if (cameraPermissions.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "The App requires your Camera in order to take Images"
      );
      return false;
    }

    return true;
  };

  const imageHandler = async () => {
    const permission = await verifyPermissions();

    if (!permission) {
      // console.log("BBB");
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImageUri(image.uri);
    getImage(image.uri);
  };

  let display = <Text>No image taken yet.</Text>;

  if (imageUri) {
    display = <Image style={styles.image} source={{ uri: imageUri }} />;
  }

  return (
    <View>
      <View style={styles.imageContainer}>{display}</View>
      <OutlinedButton name="camera" onPress={imageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
