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
  console.log(route.params.id, "😀😀😄😍🥸");

  const [Data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  //on fait la requete avec l'id en params: sur Postman fonctionne
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/:id"
        );
        // console.log(response.data);
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        // console.log(error.response);
      }
    };
    fetchData();
  });

  return (
    <View>
      <Text>You are on the room screen</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
}
