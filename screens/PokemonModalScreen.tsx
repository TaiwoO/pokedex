import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";

import { RootStackScreenProps } from "../types";

import { Pokemon } from "pokenode-ts";

export default function ModalScreen({
  navigation,
  route,
}: RootStackScreenProps<"PokemonModal">) {
  const pokemon: Pokemon = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/PokemonModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
