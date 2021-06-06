import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import { RFValue } from "react-native-responsive-fontsize";
import { KeyboardAvoidingView } from "react-native";

export default class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      photoId: "",
      photoIdNumber: "",
      name: "",
      gender: "",
      dob: "",
      isVaccineRequestActive: "",
    };
  }

  register = async (photoId, photoIdNumber, name, gender, dob) => {
    var userId = this.state.userId;
    var photoId = this.state.photoId;
    var photoIdNumber = this.state.photoIdNumber;
    var name = this.state.name;
    var gender = this.state.gender;
    var dob = this.state.dob;

    db.collection("registered_users").add({
      user_Id: userId,
      photo_Id: photoId,
      photo_Id_Number: photoIdNumber,
      name: name,
      gender: gender,
      dob: dob,
    });

    await this.getVaccineRequest();
    db.collection("users")
      .where("user_Id", "==", userId)
      .get()
      .then()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("users").doc(doc.id).update({
            isVaccineRequestActive: true,
          });
        });
      });

    this.setState({
      photoId: "",
      photoIdNumber: "",
      name: "",
      gender: "",
      dob: "",
    });

    return Alert.alert("Registered for Vaccination");
  };

  getVaccineRequest = () => {
    var vaccineRequest = db
      .collection("requested_users")
      .where("user_Id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            docId: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getVaccineRequest();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Register" navigation={this.props.navigation} />

        <KeyboardAvoidingView style={StyleSheet.keyboardAvoidingView}>
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Photo ID Proof"}
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                photoId: text,
              });
            }}
            value={this.state.photoId}
          />
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Photo ID Number"}
            keyboardType="numeric"
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                photoIdNumber: text,
              });
            }}
            value={this.state.photoIdNumber}
          />
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Name"}
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                name: text,
              });
            }}
            value={this.state.name}
          />
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Gender"}
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                gender: text,
              });
            }}
            value={this.state.gender}
          />
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Year of Birth"}
            maxLength={4}
            keyboardType="numeric"
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                dob: text,
              });
            }}
            value={this.state.dob}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.register();
              this.props.navigation.navigate("Status");
            }}
          >
            <Text
              style={{
                color: "paleturquoise",
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: RFValue(23),
    alignSelf: "center",
    marginTop: RFValue(20),
    fontWeight: "600",
  },
  formTextInput: {
    width: "75%",
    height: RFValue(35),
    alignSelf: "center",
    borderColor: "paleturquoise",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: RFValue(16),
    padding: 10,
    fontSize: RFValue(18),
  },

  button: {
    width: "75%",
    height: RFValue(40),
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: RFValue(50),
    backgroundColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(20),
  },
});
