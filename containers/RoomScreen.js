import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ViewMoreText from "react-native-view-more-text";
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
        <ScrollView style={{ paddingTop: 10 }}>
          <View style={styles.logo}>
            <Image
              source={logo}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>

          <View
            style={{
              width: "100%",
            }}
          >
            <Image
              style={{
                width: "100%",
                height: 300,
                marginBottom: 20,
              }}
              source={{ uri: Data.photos[0].url }}
            />

            <Text
              style={{
                position: "absolute",
                justifyContent: "center",
                width: 90,
                height: 50,
                backgroundColor: "black",
                fontSize: 20,
                color: "white",
                marginTop: 220,
                padding: 12,
              }}
            >
              {Data.price}€
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: 30,
            }}
          >
            <View style={{ width: "75%" }}>
              <Text numberOfLines={1} style={{ fontSize: 20 }}>
                {Data.title}
              </Text>
              <Text>{Data.rate}</Text>
            </View>
            <View style={{ width: "25%", marginLeft: 25 }}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                }}
                source={{ uri: Data.user.account.photo.url }}
              />
            </View>
          </View>

          {/* test pour etirer le text more or less */}
          <View
            style={{
              fontSize: 15,
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 20,
            }}
          >
            <ViewMoreText numberOfLines={3}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 20,
                }}
              >
                {Data.description}
              </Text>
            </ViewMoreText>
          </View>

          {/* ------------------------------------ */}
          <View>
            <Text style={{ color: "red", marginLeft: 30 }}>
              Ici sera la map!
            </Text>
          </View>
        </ScrollView>
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
