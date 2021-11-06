import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  RefreshControl,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import usePokemonEntries, { PokemonEntry } from "../hooks/usePokemonEntries";
import { RootTabScreenProps } from "../types";

import Colors from "../constants/Colors";
import PokemonListItem from "../components/PokemonListItem";

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Search">) {
  const colorScheme = useColorScheme();
  const [search, setSearch] = React.useState("");

  const [pokemonEntries, isLoading, error, refresh] = usePokemonEntries();
  const [filteredEntries, setfilteredEntries] = React.useState<PokemonEntry[]>(
    []
  );

  React.useEffect(() => {
    const filtered = pokemonEntries.filter((entry) => {
      const filter = search.trim().toLowerCase();
      return (
        parseInt(filter) === entry.number ||
        entry.name.toLowerCase().includes(filter)
      );
    });

    setfilteredEntries(filtered);
  }, [search, pokemonEntries]);

  const onPressEntry = (pokemonEntry: PokemonEntry) => {
    navigation.navigate("PokemonModal");
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View darkColor={Colors[colorScheme].header}>
        {/* Search Bar */}
        <View style={[styles.searchBar]}>
          <FontAwesome
            name="search"
            color={Colors[colorScheme].text}
            size={15}
          />

          <TextInput
            style={[
              styles.searchBar__input,
              { color: Colors[colorScheme].text },
            ]}
            onChangeText={(x) => setSearch(x)}
            placeholder="Enter pokemon name or number"
            autoCorrect={false}
            value={search}
          />

          {!!search && (
            <Pressable onPress={() => setSearch("")} hitSlop={14}>
              <FontAwesome
                name="close"
                color={Colors[colorScheme].text}
                size={15}
                style={styles.searchBar__clear}
              />
            </Pressable>
          )}
        </View>
      </View>

      {/* Search Results */}
      <FlatList
        data={filteredEntries}
        renderItem={({ item }) => (
          <PokemonListItem
            name={item.name}
            number={item.number}
            spriteUrl={item.spriteUrl}
            onPress={() => onPressEntry(item)}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
        )}
        keyExtractor={(item) => item.name}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
      />
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchBar: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  searchBar__icon: {},
  searchBar__input: {
    width: "70%",
    height: 50,
    paddingHorizontal: 14,
    // paddingVertical: 14,

    // borderWidth: 1,
  },
  searchBar__clear: {
    position: "absolute",
    left: -12,
    top: -7,
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

  separator: {
    // marginVertical: 30,
    height: 1,
    width: "100%",
  },
});
