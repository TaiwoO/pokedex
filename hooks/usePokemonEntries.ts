import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { PokemonClient } from "pokenode-ts";

interface PokemonEntry {
  name: string;
  number: number;
  spriteUrl: string;
}

const getFrontImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export default function usePokemonEntries() {
  const [data, setData] = React.useState<PokemonEntry[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);

  const refresh = async () => {
    try {
      await AsyncStorage.removeItem("pokemonEntries");
      await fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const savedEntries = await AsyncStorage.getItem("pokemonEntries");
      if (savedEntries) {
        console.log("Retrieving Pokemon Entries from Storage");
        setData(JSON.parse(savedEntries));
      } else {
        console.log("Fetching Fresh entries");

        const pokemonApi = new PokemonClient();

        const totalCount = await pokemonApi
          .listPokemons(0, 1)
          .then((res) => res.count);

        const pokemonEntries: PokemonEntry[] = await pokemonApi
          .listPokemons(0, totalCount)
          .then((res) => {
            return res.results.map((item, index) => ({
              name: item.name,
              number: index + 1,
              spriteUrl: getFrontImageUrl(index + 1),
            }));
          });

        const jsonValue = JSON.stringify(pokemonEntries);
        await AsyncStorage.setItem("pokemonEntries", jsonValue);
        setData(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error(e);
      setError(e);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return [data, isLoading, error, refresh] as const;
}
