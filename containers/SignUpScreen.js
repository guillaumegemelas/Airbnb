import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import logo from "../assets/logo.png";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

        <Text>Name: </Text>
        <TextInput placeholder="Username" />
        <Text>Password: </Text>
        <TextInput placeholder="Password" secureTextEntry={true} />
        <Button
          title="Sign up"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
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
});
