import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";
import axios from "axios";
import { useEffect } from "react";

// J'AI AJOUTE SETTOKEN DANS HOME PROPS ET DANS APP.JS SUR ROUTE HOME
export default function HomeScreen({ setToken }) {
  const navigation = useNavigation();

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
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  });

  return (
    <View>
      <Text>Welcome home!</Text>

      {/* Utiliser Flatlist idem map REact pour afficher les éléments de l'objet de la requete */}

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}
