import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function AroundmeScreen() {
  const [Data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  //pour localisation
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  //useEffect autorisation accès localisation----------------------
  useEffect(() => {
    const getPermission = async () => {
      try {
        //demander permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status === "granted") {
          console.log("on peut passer à la suite");
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsloading(false);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);

  //useEffect requete  axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around"
        );
        console.log(response.data, "---------AROUNDME--OK--------------------");
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error, "*********AROUNDME**ERROR*******************");
      }
    };
    fetchData();
  }, []);

  return (
    //on veut afficher une map avec les différents lieux ou se situent les appartements

    // idée? faire une requete axios comme pour homescreen et afficher sur une map les markers en lien avec les appartements présents dans l'API

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoading ? (
        <View>
          <Text>En cours de chargement</Text>
        </View>
      ) : (
        <View>
          {/* <Text>latitude: {latitude}</Text>
          <Text>longitude: {longitude}</Text> */}
          <MapView
            style={{ height: 600, width: 400 }}
            showsUserLocation
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.06,
              longitudeDelta: 0.06,
            }}
          >
            {Data.map((marker, index) => {
              return (
                // <Text>{marker.location[0]}</Text>
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.location[1],
                    longitude: marker.location[0],
                  }}
                />
              );
            })}
          </MapView>
        </View>
      )}
    </View>
  );
}
