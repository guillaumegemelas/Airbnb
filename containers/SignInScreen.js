import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import logo from "../assets/logo.png";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
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
          <TextInput style={styles.formtxt} placeholder="email" />
          {/* <Text>Password: </Text> */}
          <TextInput
            style={styles.formtxt}
            placeholder="password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.loginbutton}>
          <TouchableOpacity
            style={styles.login}
            title="Sign in"
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
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
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    marginBottom: 30,
    marginTop: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  txtlogo: {
    color: "#717171",
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    height: 120,
    marginTop: 50,
    marginBottom: 50,
    justifyContent: "space-around",
    alignItems: "center",
  },
  formtxt: {
    width: "82%",
    height: 40,
    borderBottomColor: "rgb(235, 90, 98)",
    borderBottomWidth: 2,
  },
  loginbutton: {
    height: 120,
    marginTop: 50,
    marginBottom: 50,
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
