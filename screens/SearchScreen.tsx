import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Image, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";

import Colors from "../constants/Colors";
interface PokemonEntry {
  name: string;
  spriteUrl: string;
}

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Search">) {
  const colorScheme = useColorScheme();
  const [search, setSearch] = React.useState("");

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View darkColor="#1F2933">
        <View style={[styles.searchBar]}>
          <FontAwesome
            name="search"
            color={Colors[colorScheme].text}
            size={20}
          />

          <TextInput
            style={[
              styles.searchBar__input,
              { color: Colors[colorScheme].text },
            ]}
            onChangeText={(x) => setSearch(x)}
            placeholder="Enter pokemon name"
            value={search}
          />
        </View>
      </View>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  searchBar: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 7,
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  searchBar__icon: {},
  searchBar__input: {
    marginLeft: 16,
    width: "70%",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});
