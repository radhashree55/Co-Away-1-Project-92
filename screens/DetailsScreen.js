import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config.js";
import { RFValue } from "react-native-responsive-fontsize";

export default class ReceiverDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: "",
      placeName: this.props.navigation.getParam("details")["nameOfPlace"],
      address: this.props.navigation.getParam("details")["address"],
      receiverName: "",
      receiverContact: "",
      receiverAddress: "",
      receiverRequestDocId: "",
    };
  }

  getUserDetails = (userId) => {
    db.collection("users")
      .where("email_id", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            userName: doc.data().name ,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails(this.state.userId);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="#ffffff"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Status",
              style: {
                color: "#ffffff",
                fontSize: RFValue(25),
                fontWeight: "bold",
                marginTop: RFValue(-10),
              },
            }}
            backgroundColor="#32867d"
          />
        </View>
        <View style={{ flex: 0.9 }}>
          <View
            style={{
              flex: 0.9,
              marginTop: RFValue(-300),
            }}
          >
            <View
              style={{
                flex: 0.6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text></Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(27),
                  textAlign: "center",
                }}
              >
                {"Dear, " +
                  userName +
                  "You have been registered at " +
                  this.state.placeName +
                  "at 10:00 am please reach on time and show this meassage. Plase carry Id card"}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.7,
            }}
          >
            <View
              style={{
                flex: 0.5,
                alignItems: "center",
                borderWidth: 5,
                borderColor: "#deeedd",
                marginTop: 30,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: RFValue(24),
                }}
              >
                Receiver's Information
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(15),
                  alignSelf: "flex-start",
                }}
              >
                Name: {this.state.receiverName}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(15),
                  alignSelf: "flex-start",
                }}
              >
                Contact: {this.state.receiverContact}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: RFValue(20),
                  marginTop: RFValue(15),
                  alignSelf: "flex-start",
                }}
              >
                Address: {this.state.receiverAddress}
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.state.receiverId !== this.state.userId ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.updateBookStatus();
                    this.addNotification();
                    this.props.navigation.navigate("MyDonations");
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: RFValue(20) }}>
                    Donate
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "65%",
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(20),
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 20,
  },
});
