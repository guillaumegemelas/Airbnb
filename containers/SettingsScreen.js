import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

export default function SettingsScreen({ setToken, setId }) {
  // const route = useRoute();

  //création de states pour les éléments à afficher:
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsloading] = useState(true);

  //data à stocker lors de la requete axios
  const [Data, setData] = useState();

  useEffect(() => {
    const handleProfil = async () => {
      //pas sure de la recuperation de l'id: est il vraiement stocké?
      const id = await AsyncStorage.getItem("userId");
      console.log(id, "--------profile id------------"); // revoie null
      const token = await AsyncStorage.getItem("userToken");
      console.log(token, "--------profile token------------");

      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${id}`
        );
        setData(response.data);
        console.log(response.data, "---------Profile--ok------");
        setIsloading(false);
      } catch (error) {
        console.log(error.response.data, "*********Profile**error****");
      }
    };
    handleProfil();
  }, []);

  //seconde requete à faire en post pour udate les settings (username, email et description)

  return (
    <View>
      {/* image de l'utilisateur */}
      <View
        style={{
          height: "25%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Image</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          value={email}
          style={styles.formtxt}
          placeholder="email"
          // onChangeText={(input) => {
          //   setEmail(input);
          // console.log(input);
          // }}
        />

        <TextInput
          value={username}
          // theme={{ colors: { onSurfaceVariant: "yellow" } }}
          style={styles.formtxt}
          placeholder="username"
          // onChangeText={(input) => {
          //   setUsername(input);
          // console.log(input);
          // }}
        />

        <TextInput
          value={description}
          style={styles.formtxtdes}
          multiline={true}
          numberOfLines={4}
          placeholder="Describes yourself in a few words..."
          // onChangeText={(input) => {
          //   setDescription(input);
          // console.log(input);
          // }}
        />
      </View>

      <View style={styles.loginbutton}>
        <TouchableOpacity
          style={styles.login1}
          title="Update"
          onPress={() => {
            // setToken(null);
          }}
        >
          <Text style={{ fontSize: 17, color: "#717171", fontWeight: "bold" }}>
            Update
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          title="Log Out"
          onPress={() => {
            setToken(null);
          }}
        >
          <Text style={{ fontSize: 17, color: "#717171", fontWeight: "bold" }}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    height: "50%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  formtxt: {
    width: "82%",
    marginBottom: 0,
    borderBottomColor: "rgb(235, 90, 98)",
    borderBottomWidth: 2,
  },
  formtxtdes: {
    width: "82%",
    marginBottom: 0,
    borderColor: "rgb(235, 90, 98)",
    borderWidth: 2,
    height: 80,
  },

  loginbutton: {
    height: "25%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  login: {
    borderColor: "rgb(235, 90, 98)",
    backgroundColor: "lightgray",
    borderWidth: 2,
    height: 50,
    width: 180,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  login1: {
    borderColor: "rgb(235, 90, 98)",
    borderWidth: 2,
    height: 50,
    width: 180,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
