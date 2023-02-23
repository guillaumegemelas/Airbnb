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

// il faut importer les icones Entypo ----------------------
import { Entypo } from "@expo/vector-icons";
//--------------------------------------------------------

export default function HomeScreen() {
  const navigation = useNavigation();

  const [Data, setData] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        console.log(response.data, "---------HOME--OK--------------------");
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(
          error.response.data,
          "*********HOME**ERROR*******************"
        );
      }
    };
    fetchData();
  }, []);

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
        <View>
          <Text>en cours de chargement</Text>
          <ActivityIndicator
            size="large"
            color="#EB5A62"
            hidesWhenStopped={true}
          />
        </View>
      ) : (
        <View style={{ marginTop: 10 }}>
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
              // console.log(item);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Room", { id: item._id })}
                >
                  <View>
                    <View
                      style={{
                        width: "100%",
                        marginLeft: "5%",
                      }}
                    >
                      {/* on peut utiliser ImageBackground pour mettre texte sur photso */}
                      <Image
                        style={{
                          width: "90%",
                          height: 200,
                          marginBottom: 20,
                        }}
                        source={{ uri: item.photos[0].url }}
                      />
                      <View
                        style={{
                          position: "absolute",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 140,
                          width: 90,
                          height: 50,
                          backgroundColor: "black",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 25,
                            color: "white",
                          }}
                        >
                          {item.price}€
                        </Text>
                      </View>
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
                        <Text
                          numberOfLines={1}
                          style={{ fontSize: 20, marginBottom: 10 }}
                        >
                          {item.title}
                        </Text>

                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text>{generateStars(item.ratingValue)}</Text>
                          <Text style={{ marginLeft: 15, color: "lightgray" }}>
                            {item.reviews} reviews
                          </Text>
                        </View>
                      </View>

                      <View style={{ width: "25%", marginLeft: 25 }}>
                        <Image
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                            marginBottom: 10,
                          }}
                          source={{ uri: item.user.account.photo.url }}
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
    height: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
});
