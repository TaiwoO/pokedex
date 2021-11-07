import { Pokemon } from "pokenode-ts";
import * as React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View as DefaultView,
} from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import { RootStackScreenProps } from "../types";

const overlayPng = require("../assets/images/pokemon-overlay.png");

type ColorType = keyof typeof Colors["type"];

export default function ModalScreen({
  navigation,
  route,
}: RootStackScreenProps<"PokemonModal">) {
  const pokemon: Pokemon = route.params;

  const pokemonImageUrl =
    pokemon.sprites?.other["official-artwork"]?.front_default;
  const pokemonTypeList = pokemon.types.map((x) => x.type.name);
  const pokemonType: ColorType = Object.keys(Colors.type).includes(
    pokemon.types[0]?.type.name
  )
    ? pokemon.types[0]?.type.name
    : "unknown";

  return (
    // <View
    //   style={[styles.container, { backgroundColor: Colors.type[pokemonType] }]}
    // >
    <ImageBackground
      source={overlayPng}
      style={[styles.container, { backgroundColor: Colors.type[pokemonType] }]}
      imageStyle={{ width: "100%", height: "40%", resizeMode: "cover" }}
    >
      <Image
        source={{ uri: pokemonImageUrl }}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
          position: "absolute",
          top: 125,
          zIndex: 99,

          left: Layout.window.width / 2 - 250 / 2,
        }}
      />

      <DefaultView style={styles.main}>
        <DefaultView style={styles.header}>
          <DefaultView>
            <Text style={styles.header__title}>{pokemon.name}</Text>
            <DefaultView style={styles.header__tagsContainer}>
              {pokemonTypeList.map((type) => (
                <DefaultView key={type} style={styles.header__tag}>
                  <Text style={styles.header__tagText}>{type}</Text>
                </DefaultView>
              ))}
            </DefaultView>
          </DefaultView>

          <Text style={styles.header__pokemonNum}>#{pokemon.id}</Text>
        </DefaultView>

        <View style={[styles.content]}>
          <Text>
            Elit pariatur enim reprehenderit officia ea. Elit pariatur enim
            reprehenderit officia ea.Elit pariatur enim reprehenderit officia
            ea. Elit pariatur enim reprehenderit officia ea.Elit pariatur enim
            reprehenderit officia ea. Elit pariatur enim reprehenderit officia
            ea.
          </Text>
        </View>
      </DefaultView>
    </ImageBackground>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },

  main: {
    flex: 1,
    justifyContent: "space-between",
  },

  header: {
    margin: 32,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header__title: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 8
  },
  header__tagsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  header__tag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    marginRight: 8,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  header__tagText: {
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
  },
  header__pokemonNum: {
    fontSize: 24,
    fontWeight: "bold",
  },

  content: {
    paddingVertical: 64,
    paddingHorizontal: 32,
    height: "60%",
    width: "100%",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // borderTopStartRadius: 50,
    // borderTopEndRadius: 50
  },

  // card: {
  //   shadowColor: "red",
  //   shadowOffset: {
  //     width: 0,
  //     height: 12,
  //   },
  //   shadowOpacity: 0.58,
  //   shadowRadius: 16.0,

  //   elevation: 24,
  // },
});
