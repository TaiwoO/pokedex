import { Pokemon } from "pokenode-ts";
import * as React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View as DefaultView,
  ScrollView,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { RootStackScreenProps } from "../types";
import useColorScheme from "../hooks/useColorScheme";

import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const overlayPng = require("../assets/images/pokemon-overlay.png");
type ColorType = keyof typeof Colors["type"];
type PokemonData = {
  id: any;
  name: string;
  imgUrl: string;
  type: string;
  typeList: Array<string>;
  species: string;
  height: {
    meters: number;
    cm: number;
  };
  weight: {
    pounds: number;
    kg: number;
  };
  abilties: Array<string>;
  stat: {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
  };
};

const extractPokemonData = (pokemon: Pokemon) => {
  const firstType = pokemon.types[0]?.type.name;
  const type: ColorType = Object.keys(Colors.type).includes(firstType)
    ? (firstType as ColorType)
    : "unknown";

  const stat = {
    hp: 0,
    attack: 0,
    defense: 0,
    "special-attack": 0,
    "special-defense": 0,
    speed: 0,
  };
  pokemon.stats.forEach((s) => (stat[s.stat.name] = s.base_stat));

  return {
    id: pokemon.id,
    name: pokemon.name,
    imgUrl: pokemon.sprites?.other["official-artwork"]?.front_default,
    type,
    typeList: pokemon.types.map((x) => x.type.name),
    species: pokemon.species.name,
    height: {
      meters: pokemon.height / 10,
      cm: pokemon.height * 10,
    },
    weight: {
      pounds: pokemon.weight / 4.536,
      kg: pokemon.weight / 10,
    },
    abilties: pokemon.abilities.map((x) => x.ability.name),
    stat,
  } as PokemonData;
};

const Bar = ({
  value,
  color,
  backgroundColor,
}: {
  value: number;
  color: string;
  backgroundColor: string;
}) => {
  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          // width: "100%",
          height: 5,
          opacity: 0.4,
          backgroundColor: backgroundColor,
          borderRadius: 999,
        }}
      />
      <View
        style={{
          width: `${value}%`,
          height: 5,
          position: "absolute",
          backgroundColor: color,
          borderRadius: 999,
        }}
      />
    </View>
  );
};

const BaseStats = ({
  hp = 0,
  attack = 0,
  defense = 0,
  specialAttack = 0,
  specialDefense = 0,
  speed = 0,
  type = "",
}: {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  type: string;
}) => {
  const total = hp + attack + defense + specialAttack + specialDefense + speed;

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly" }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1, marginRight: 14, }}>HP</Text>
        <Text style={{ flex: 1 }}>{hp}</Text>
        <View style={{ flex: 4 }}>
          <Bar
            value={(hp / total) * 100}
            color={Colors.type[type]}
            backgroundColor={Colors.type[type]}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1, marginRight: 14 }}>Attack</Text>
        <Text style={{ flex: 1 }}>{attack}</Text>
        <View style={{ flex: 4 }}>
          <Bar
            value={(attack / total) * 100}
            color={Colors.type[type]}
            backgroundColor={Colors.type[type]}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1, marginRight: 14 }}>Defense</Text>
        <Text style={{ flex: 1 }}>{defense}</Text>
        <View style={{ flex: 4 }}>
          <Bar
            value={(defense / total) * 100}
            color={Colors.type[type]}
            backgroundColor={Colors.type[type]}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1, marginRight: 14 }}>Sp. Atk</Text>
        <Text style={{ flex: 1 }}>{specialAttack}</Text>
        <View style={{ flex: 4 }}>
          <Bar
            value={(specialAttack / total) * 100}
            color={Colors.type[type]}
            backgroundColor={Colors.type[type]}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1, marginRight: 14 }}>Sp. Def</Text>
        <Text style={{ flex: 1 }}>{specialDefense}</Text>
        <View style={{ flex: 4 }}>
          <Bar
            value={(specialDefense / total) * 100}
            color={Colors.type[type]}
            backgroundColor={Colors.type[type]}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1, marginRight: 14 }}>Speed</Text>
        <Text style={{ flex: 1 }}>{speed}</Text>
        <View style={{ flex: 4 }}>
          <Bar
            value={(speed / total) * 100}
            color={Colors.type[type]}
            backgroundColor={Colors.type[type]}
          />
        </View>
      </View>
      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ flex: 1, marginRight: 14 }}>Total</Text>
        <Text style={{ flex: 1 }}>{total}</Text>
        <View style={{ flex: 4 }}>
          <Bar value={50} color="red" backgroundColor="purple" />
        </View>
      </View> */}
    </View>
  );
};

const AboutTab = React.memo(function AboutTab({
  weight,
  height,
  abilties,
  stat,
  type,
}: PokemonData) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        marginTop: 20,
        marginBottom: 45,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View style={styles.aboutLabel}>
              <MaterialCommunityIcons
                name="scale"
                size={18}
                color={Colors[colorScheme].text}
                style={{ marginRight: 4, opacity: 0.6 }}
              />
              <Text style={[{ opacity: 0.6, fontSize: 14 }]}>Weight:</Text>
            </View>

            <Text>
              {weight.pounds.toFixed(2)} lbs ({weight.kg.toFixed(1)} kg)
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <View style={styles.aboutLabel}>
            <MaterialCommunityIcons
              name="ruler"
              size={18}
              color={Colors[colorScheme].text}
              style={{ marginRight: 4, opacity: 0.6 }}
            />
            <Text style={[{ opacity: 0.6, fontSize: 14 }]}>Height:</Text>
          </View>

          <Text>{height.meters} m</Text>
        </View>

        <View>
          <View style={styles.aboutLabel}>
            <MaterialCommunityIcons
              name="sword-cross"
              size={18}
              color={Colors[colorScheme].text}
              style={{ marginRight: 4, opacity: 0.6 }}
            />
            <Text style={[{ opacity: 0.6, fontSize: 14 }]}>Abilities:</Text>
          </View>
          <ScrollView
            style={{ maxHeight: 52 }}
            showsVerticalScrollIndicator={false}
          >
            {abilties.map((ability) => (
              <Text key={ability} style={{ textAlign: "center" }}>
                {ability}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>

      <BaseStats
        hp={stat.hp}
        attack={stat.attack}
        defense={stat.defense}
        specialAttack={stat["special-attack"]}
        specialDefense={stat["special-defense"]}
        speed={stat.speed}
        type={type}
      />
    </View>
  );
});

const EvolutionTab = () => <View style={{ flex: 1 }} />;

// const renderScene = SceneMap({
//   about: AboutTab,
//   evolution: EvolutionTab,
// });
const renderScene = ({ route }, pokemonData: PokemonData) => {
  switch (route.key) {
    case "about":
      return <AboutTab {...pokemonData} />;
    case "evolution":
      return <EvolutionTab />;
    default:
      return null;
  }
};

export default function ModalScreen({
  navigation,
  route,
}: RootStackScreenProps<"PokemonModal">) {
  const layout = useWindowDimensions();
  const pokemonData = extractPokemonData(route.params);

  const [tabIndex, setIndex] = React.useState(0);
  const [tabRoutes] = React.useState([
    { key: "about", title: "About" },
    // { key: "stats", title: "Base Stats" },
    { key: "evolution", title: "Evolution" },
  ]);

  return (
    <ImageBackground
      source={overlayPng}
      style={[
        styles.container,
        { backgroundColor: Colors.type[pokemonData.type] },
      ]}
      imageStyle={{ width: "100%", height: "40%", resizeMode: "cover" }}
    >
      <Image
        source={{ uri: pokemonData.imgUrl }}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
          position: "absolute",
          top: 125,
          zIndex: 99,

          left: layout.width / 2 - 250 / 2,
        }}
      />

      <DefaultView style={styles.main}>
        <DefaultView style={styles.header}>
          <DefaultView>
            <Text style={styles.header__title}>{pokemonData.name}</Text>
            <DefaultView style={styles.header__tagsContainer}>
              {pokemonData.typeList.map((type) => (
                <DefaultView key={type} style={styles.header__tag}>
                  <Text style={styles.header__tagText}>{type}</Text>
                </DefaultView>
              ))}
            </DefaultView>
          </DefaultView>

          <Text style={styles.header__pokemonNum}>#{pokemonData.id}</Text>
        </DefaultView>

        <View style={[styles.content]}>
          <TabView
            navigationState={{ index: tabIndex, routes: tabRoutes }}
            renderScene={(tabViewProps) =>
              renderScene(tabViewProps, pokemonData)
            }
            // renderScene={(props) => renderScene({...props, yoo:'Need to make renderSchee a function so I can pass extra stuff?'})}

            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{ backgroundColor: "transparent" }}
            renderTabBar={(props) => (
              // renderTabBar({ indicatorColor: "pink", ...props })
              <TabBar
                indicatorStyle={{
                  backgroundColor: Colors.type[pokemonData.type],
                  height: 3,
                  // width:,
                  borderRadius: 999,
                }}
                style={{ backgroundColor: "transparent" }}
                renderLabel={({ route, focused, color }) => (
                  <Text style={[]}>{route.title}</Text>
                )}
                // getLabelText={({ route }) => route.title }
                {...props}
              />
            )}
          />
        </View>
      </DefaultView>
    </ImageBackground>
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
    margin: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header__title: {
    fontSize: 35,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 8,
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
    paddingVertical: 40,
    paddingHorizontal: 30,
    height: "60%",
    width: "100%",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // borderTopStartRadius: 50,
    // borderTopEndRadius: 50
  },

  aboutLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    borderBottomWidth: 1,
    borderColor: "rgba(228, 233, 237, .6)",
    borderRadius: 9999,
  },
});
