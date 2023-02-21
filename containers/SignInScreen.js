import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  // Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import logo from "../assets/logo.png";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      //si retour API avec token, on stocke token
      if (response.data.token) {
        setToken(response.data.token);
        alert("Connection réussie");
        //sinon nav vers page SignUp
      } else navigation.navigate("SignUp");
      //cas d'erreurs
    } catch (error) {
      console.log(error.response);
      if (error.response.data.error === "Unauthorized") {
        setErrorMessage("Email ou mot de passe incorrect");
      }
    }
  };

  return (
    <View>
      <View>
        <View style={styles.logo}>
          <Image
            source={logo}
            style={{
              width: 90,
              height: 90,

              marginBottom: 10,
              marginTop: 10,
            }}
          />
          <View>
            <Text style={styles.txtlogo}>Sign in</Text>
          </View>
        </View>

        <View style={styles.form}>
          {/* <Text>email </Text> */}
          <TextInput
            value={email}
            style={styles.formtxt}
            placeholder="email"
            onChangeText={(input) => {
              setEmail(input);
              console.log(input);
            }}
          />
          {/* <Text>Password: </Text> */}
          <TextInput
            value={password}
            style={styles.formtxt}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(input) => {
              setPassword(input);
              console.log(input);
            }}
          />
        </View>

        <View style={styles.loginbutton}>
          <TouchableOpacity
            style={styles.login}
            title="Sign in"
            onPress={async () => {
              handleLogin();
            }}
          >
            <Text
              style={{ fontSize: 17, color: "#717171", fontWeight: "bold" }}
            >
              Sign in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text
              style={{ fontSize: 13, color: "#717171", fontWeight: "bold" }}
            >
              No account? Register
            </Text>
          </TouchableOpacity>
          {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  txtlogo: {
    color: "#717171",
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  formtxt: {
    width: "82%",
    height: 40,
    marginBottom: 40,
    borderBottomColor: "rgb(235, 90, 98)",
    borderBottomWidth: 2,
  },
  loginbutton: {
    height: "30%",

    justifyContent: "space-around",
    alignItems: "center",
  },
  login: {
    borderColor: "rgb(235, 90, 98)",
    borderWidth: 2,
    height: 50,
    width: 160,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
