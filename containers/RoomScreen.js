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
//import pour map
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
//
import logo from "../assets/logo.png";

// il faut importer les icones Entypo ----------------------
import { Entypo } from "@expo/vector-icons";

//-----import pour carroussel-------------------------------
import Swiper from "react-native-swiper-flatlist";
//----------------------------------------------------

export default function RoomScreeen() {
  const route = useRoute();
  const id = route.params.id;

  const [Data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  //---map--------------------------------------
  const markers = [
    {
      id: 1,
      latitude: 48.8564449,
      longitude: 2.4002913,
      title: "Le Reacteur",
      description: "La formation des champion·ne·s !",
    },
  ];
  //-------------------------------------------

  //on fait la requete avec l'id en params:
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );

        setData(response.data);
        console.log(response.data, "------------Room--ok----------");
        setIsloading(false);
      } catch (error) {
        console.log(error.response.data, "*********Room**error**************");
        //limité sur cette route à 1 requete par seconde
      }
    };
    fetchData();
  }, [id]);

  //--fonction-pour-générer-étoiles-rating-------------
  const generateStars = (ratingValue) => {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        starsArray.push(
          <Entypo name="star" size={24} color="#DAA520" key={i} />
        );
      } else {
        starsArray.push(<Entypo name="star" size={24} color="grey" key={i} />);
      }
    }
    return starsArray;
  };
  //-------------------

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{ marginTop: 15 }}>
          <View style={styles.logo}>
            <Image
              source={logo}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </View>

          <View>
            {/* test carroussel */}
            <ScrollView>
              <Swiper
                style={{ height: 300 }}
                dotColor="salmon"
                activeDotColor="red"
              >
                {Data.photos.map((pict, index) => {
                  return (
                    <View key={index} style={{ height: 300 }}>
                      <Image
                        style={{
                          width: 550,
                          height: 300,
                        }}
                        source={{ uri: pict.url }}
                      />
                    </View>
                  );
                })}
              </Swiper>
            </ScrollView>

            {/* fin test carroussel */}

            {/* <View>
              <Image
                style={{
                  width: 550,
                  height: 300,
                }}
                source={{ uri: Data.photos[0].url }}
              />
            </View> */}
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
              marginTop: 20,
            }}
          >
            <View style={{ width: "75%" }}>
              <Text numberOfLines={1} style={{ fontSize: 20 }}>
                {Data.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>{generateStars(Data.ratingValue)}</Text>
                <Text style={{ marginLeft: 15, color: "lightgray" }}>
                  {Data.reviews} reviews
                </Text>
              </View>
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

          {/* test pour etirer le text more or less ---------*/}
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

          {/* affichage de la map--------------------- */}
          <View>
            <MapView
              style={{ flex: 1, height: 300, width: "100%" }}
              initialRegion={{
                latitude: 48.856614,
                longitude: 2.3522219,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
              showsUserLocation={true}
            >
              {markers.map((marker) => {
                return (
                  <Marker
                    key={marker.id}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    title={marker.title}
                    description={marker.description}
                  />
                );
              })}
            </MapView>
          </View>

          {/* Fin affichage de la map----------------- */}
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
