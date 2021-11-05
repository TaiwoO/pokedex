import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import usePokemonEntries from "../hooks/usePokemonEntries";
import { RootTabScreenProps } from "../types";

import Colors from "../constants/Colors";
import PokemonListItem from "../components/PokemonListItem";

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"Search">) {
  const colorScheme = useColorScheme();
  const [search, setSearch] = React.useState("");

  const [pokemonEntries, isLoading, error, refresh] = usePokemonEntries();
  const [filteredEntries, setfilteredEntries] = React.useState<
    typeof pokemonEntries
  >([]);

  React.useEffect(() => {
    const filtered = pokemonEntries.filter((entry) => {
      const filter = search.trim().toLowerCase();
      return entry.name.toLowerCase().startsWith(filter);
    });

    setfilteredEntries(filtered);
  }, [search, pokemonEntries]);

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
            placeholder="Enter pokemon name"
            value={search}
          />
        </View>
      </View>

      {/* Search Results */}
      <FlatList
        data={filteredEntries}
        renderItem={({ item }) => (
          <PokemonListItem name={item.name} spriteUrl={item.spriteUrl} />
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
    // marginHorizontal: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
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
    paddingHorizontal: 14,
    paddingVertical: 14,
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
