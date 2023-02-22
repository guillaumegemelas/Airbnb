import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
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

export default function RoomScreeen() {
  const route = useRoute();
  //   console.log(route.params.id, "😀😀😄😍🥸");

  const id = route.params.id;
  //   console.log(id, "😡😡🤬");

  const [Data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  //on fait la requete avec l'id en params: sur Postman fonctionne
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );

        setData(response.data);
        console.log(response.data, "------------------------");
        setIsloading(false);
      } catch (error) {
        console.log(error.response.data, "*************************");
        //limité sur cette route à 1 requete par seconde
      }
    };
    fetchData();
  }, [id]);

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

          <FlatList
            data={Data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return <Text>{item.description}</Text>;
            }}
          />

          <Text>{route.params.id}</Text>
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
