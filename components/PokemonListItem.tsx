import React from "react";
import { Image, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

interface Props {
  name: string;
  spriteUrl?: string;
}

export default function PokemonListItem({ name, spriteUrl }: Props) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: spriteUrl,
        }}
        style={[
          styles.image,
          {
            backgroundColor: Colors[colorScheme].tint,
          },
        ]}
      />
      <Text>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginRight: 12,
  },
});
