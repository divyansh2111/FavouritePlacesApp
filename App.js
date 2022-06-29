import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useCallback, useEffect, useState } from "react";
import { init } from "./utils/database";
// import AppLoading from "expo-app-loading";
import PlaceDetails from "./screens/PlaceDetails";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await init();
        // console.log("1", isLoading);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
        // console.log("2", isLoading);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    // console.log("boom");
    return null;
  }
  // console.log("cool");
  // if (!isLoading) return <AppLoading />;

  return (
    <>
      <StatusBar style="auto" />
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary500,
              },
              headerTintColor: Colors.gray700,
              contentStyle: { backgroundColor: Colors.gray700 },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                title: "Your Favourite Places",
                headerRight: ({ tintColor }) => (
                  <IconButton
                    name="add"
                    color={tintColor}
                    size={24}
                    onPress={() => navigation.navigate("AddPlaces")}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="AddPlaces"
              component={AddPlaces}
              options={{
                title: "Add Your Favourite Place",
              }}
            />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen
              name="PlaceDetails"
              component={PlaceDetails}
              options={{
                title: "Loading Place...",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </>
  );
}
