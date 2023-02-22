import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

// J'AI AJOUTE SETTOKEN DANS HOME PROPS ET DANS APP.JS SUR ROUTE HOME
export default function HomeScreen({ setToken }) {
  const navigation = useNavigation();

  const [Data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  //faire une requete vers: "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms" avex axios mais bien
  //penser à importer le token de la page login ou sign up
  // il faut au préalable qu'il soit stocké dans le asynstorage (App.js)

  // puis requete avec useEffect()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        // console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  });

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.logo}>
            <Image
              source={logo}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>

          {/* Utiliser Flatlist idem map REact pour afficher les éléments de l'objet de la requete */}

          <FlatList
            data={Data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              // console.log(item);
              return (
                <TouchableOpacity>
                  <View>
                    <View
                      style={{
                        width: "100%",
                        marginLeft: "5%",
                      }}
                    >
                      <Image
                        style={{
                          width: 150,
                          height: 200,
                          marginBottom: 20,
                        }}
                        source={item.photos}
                      />

                      <Text
                        style={{
                          position: "absolute",
                          justifyContent: "center",
                          width: 90,
                          height: 50,
                          backgroundColor: "black",
                          fontSize: 25,
                          color: "white",
                          marginTop: 140,
                          padding: 12,
                        }}
                      >
                        {item.price}€
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginLeft: "5%",
                        marginRight: "5%",
                        marginBottom: 30,
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                      }}
                    >
                      <View style={{ width: "75%" }}>
                        <Text numberOfLines={1} style={{ fontSize: 20 }}>
                          {item.title}
                        </Text>
                        <Text>{item.rate}</Text>
                      </View>
                      <View style={{ width: "25%", marginLeft: 25 }}>
                        <Image
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                            marginBottom: 10,
                          }}
                          source={item.user.account.photo}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          <Button
            title="Go to Profile"
            onPress={() => {
              navigation.navigate("Profile", { userId: 123 });
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
});
