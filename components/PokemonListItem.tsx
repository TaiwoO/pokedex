import React from "react";
import { Image, StyleSheet, PressableProps, Pressable } from "react-native";
import { Text, View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

interface Props extends PressableProps {
  name: string;
  number: number | string;
  spriteUrl?: string;
}

export default React.memo(function PokemonListItem({
  name,
  number,
  spriteUrl,
}: Props) {
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
            backgroundColor: Colors[colorScheme].grey_800,
          },
        ]}
      />
      <View>
        <Text>{name}</Text>
        <Text style={{ opacity: 0.4 }}>#{number}</Text>
      </View>
    </View>
  );
});

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
