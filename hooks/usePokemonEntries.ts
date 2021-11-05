import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PokemonEntry {
  name: string;
  spriteUrl: string;
}

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
        console.log("Retrieving Saved entries");
        setData(JSON.parse(savedEntries));
      } else {
        // get data.
        console.log("Fetching Fresh entries");
        let pokemonEntries: PokemonEntry[] = [
          {
            name: "Squrruial",
            spriteUrl:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          },
          {
            name: "dragon",
            spriteUrl:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
          },
          {
            name: "nooooo",
            spriteUrl:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png",
          },
        ];

        const jsonValue = JSON.stringify(pokemonEntries);
        await AsyncStorage.setItem("pokemonEntries", jsonValue);
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
