import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        }
      );
      console.log(response.data);
      //si retour API avec token, on stocke token

      if (password !== passwordConf) {
        setErrorMessage("Merci de saisir 2 mots de passe identiques");
      } else {
        if (response.data.token) {
          setToken(response.data.token);
          alert("Cotre compte a bien été créé");
          //sinon nav vers page SignUp
        } else navigation.navigate("SignIn");
        //cas d'erreurs
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.data.error === "This email already has an account.") {
        setErrorMessage("This email already has an account");
      }

      if (
        error.response.data.error === "This username already has an account."
      ) {
        setErrorMessage("This username already has an account");
      }
      if (error.response.data.error === "Missing parameters") {
        setErrorMessage("One parameter is missing");
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
            <Text style={styles.txtlogo}>Sign up</Text>
          </View>
        </View>

        <View style={styles.form}>
          {/* <Text>email </Text> */}
          <TextInput
            value={username}
            // theme={{ colors: { onSurfaceVariant: "yellow" } }}
            style={styles.formtxt}
            placeholder="username"
            onChangeText={(input) => {
              setUsername(input);
              console.log(input);
            }}
          />

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
          {/* confirm password */}
          <TextInput
            value={passwordConf}
            style={styles.formtxt}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(input) => {
              setPasswordConf(input);
              console.log(input);
            }}
          />
        </View>

        <View style={styles.loginbutton}>
          <TouchableOpacity
            style={styles.login}
            title="Sign in"
            onPress={async () => {
              handleSignUp();
            }}
          >
            <Text
              style={{ fontSize: 17, color: "#717171", fontWeight: "bold" }}
            >
              Sign up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            {errorMessage && (
              <Text style={{ color: "red" }}>{errorMessage}</Text>
            )}
            <Text
              style={{ fontSize: 13, color: "#717171", fontWeight: "bold" }}
            >
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  txtlogo: {
    color: "#717171",
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    height: "55%",
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
    borderWidth: 2,
    height: 50,
    width: 160,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
