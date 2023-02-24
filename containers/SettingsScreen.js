import {
  Button,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
// import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import logo from "../assets/logo.png";

export default function SettingsScreen({ setToken, setId }) {
  //création de states pour les éléments à afficher:
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [selectedPicture, setSelectedPicture] = useState(null);

  //pour autorisation d'accéder à la galerie
  const getPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(status, "-------status galerie---------");
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      setSelectedPicture(result.assets[0].uri);
    }
  };

  //pour autorisation d'accéder à l'appareil photo
  const getPermissionAndTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log(status, "-------status camera---------");
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      console.log(result);
      setSelectedPicture(result.assets[0].uri);
    }
  };

  //envoi de photos+++++++ne fonctionne pas pour le moment++++++++++++++++++++++++++++++++
  const sendPicture = async () => {
    setIsloading(true);
    const tab = selectedPicture.split(".");
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: `my-pic.${tab[1]}`,
        type: `image/${tab[1]}`,
      });
      const response = await axios.post(
        "https://upload-file-server-with-js.herokuapp.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            transformRequest: (formData) => formData,
          },
          //Si vous avez des headers à transmettre c'est par ici !
          //headers: { Authorization: "Bearer " + userToken },
          //transformRequest: (formData) => formData,
        }
      );
      if (response.data) {
        setIsloading(false);
        alert("Photo Envoyée !");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  useEffect(() => {
    //requete pour infos sur l'utilisateur à l'affichage de la page---------------
    const handleProfil = async () => {
      const id = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      const query = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${id}`,
          query
        );
        // je dois mettre chacun des states car je ne stock pas les infos lors du sign in ou up
        //comme le mail, username, etc... suelement l'id
        // si je les avais stocké, j'aurai pu mettre directement const [email, setEmail] = useState(Data.email)
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);
        setPhoto(response.data.photo);
        console.log(response.data, "---------Profile--ok------");
        setIsloading(false);
      } catch (error) {
        console.log(error, "*********Profile**error****");
      }
    };
    handleProfil();
    //-----------------------------------------------------------------

    //seconde requete pour udate les settings (username, email et description-------------------
    const updateProfils = async () => {
      const token = await AsyncStorage.getItem("userToken");

      const query = {
        headers: { Authorization: `Bearer ${token}` },
      };
      try {
        const response = await axios.put(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/update",
          {
            email: email,
            username: username,
            description: description,
          },
          query
        );
        setEmail(response.data.email);
        setUsername(response.data.username);
        setDescription(response.data.description);
        console.log(response.data, "---------updateProfile--ok------");
      } catch (error) {
        console.log(error.response, "*********UpdateProfile**error****");
      }
    };
    updateProfils();
  }, []);

  ///fin seconde requete--------------------------------

  return (
    <View>
      {isLoading ? (
        <View>
          <ActivityIndicator
            size="large"
            color="#EB5A62"
            hidesWhenStopped={true}
          />
        </View>
      ) : (
        <View>
          {/* image de l'utilisateur */}
          <View
            style={{
              height: "25%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View>
              {photo ? (
                <Image source={{ uri: photo }} style={{}}></Image>
              ) : selectedPicture ? (
                <Image
                  source={{ uri: selectedPicture }}
                  style={{
                    width: 140,
                    height: 140,
                    borderColor: "#EB5A62",
                    borderWidth: 2,
                    borderRadius: 70,
                  }}
                ></Image>
              ) : (
                <Image
                  source={logo}
                  style={{
                    width: 140,
                    height: 140,
                    borderColor: "#EB5A62",
                    borderWidth: 2,
                    borderRadius: 70,
                  }}
                ></Image>
              )}
            </View>

            {/* on créé 2 boutons pour choisir photos dans galerie */}
            <View
              style={{
                height: 100,
                justifyContent: "space-around",
                marginLeft: 20,
              }}
            >
              <View>
                <TouchableOpacity onPress={getPermission}>
                  <Ionicons name={"images-outline"} size={30} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={getPermissionAndTakePhoto}>
                  <Ionicons name={"camera-outline"} size={35} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.form}>
            <TextInput
              value={email}
              style={styles.formtxt}
              placeholder="email"
              onChangeText={(input) => {
                setEmail(input);
                console.log(input);
              }}
            />

            <TextInput
              value={username}
              style={styles.formtxt}
              placeholder="username"
              onChangeText={(input) => {
                setUsername(input);
                console.log(input);
              }}
            />

            <TextInput
              value={description}
              style={styles.formtxtdes}
              multiline={true}
              numberOfLines={4}
              placeholder="Describes yourself in a few words..."
              onChangeText={(input) => {
                setDescription(input);
                console.log(input);
              }}
            />
          </View>

          <View style={styles.loginbutton}>
            <TouchableOpacity
              style={styles.login1}
              title="Update"
              onPress={() => {
                sendPicture;
              }}
            >
              <Text
                style={{ fontSize: 17, color: "#717171", fontWeight: "bold" }}
              >
                Update
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.login}
              title="Log Out"
              onPress={() => {
                setToken(null);
                setId("");
              }}
            >
              <Text
                style={{ fontSize: 17, color: "#717171", fontWeight: "bold" }}
              >
                Log out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
