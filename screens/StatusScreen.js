import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

export default class StatusScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      places: [],
    };
    this.requestRef = null;
  }

  getplaces = () => {
    this.requestRef = db
      .collection("allPlaces")
      .where("availability", "==", true)
      .onSnapshot((snapshot) => {
        var places = snapshot.docs.map((doc) => doc.data());
        this.setState({
          places: places,
        });
      });
  };

  componentDidMount() {
    this.getplaces();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <TouchableOpacity
      onPress={() => {
        this.props.navigation.navigate("Details", { details: item });
      }}
    >
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{"Name: " + item.nameOfPlace}</ListItem.Title>
          <ListItem.Subtitle>{"Address: " + item.address}</ListItem.Subtitle>
          <Text>{"Doses: " + item.doses}</Text>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );

  render() {
    return (
      <SafeAreaView style={styles.view}>
        <MyHeader title="Status" navigation={this.props.navigation} />
        <View style={{ flex: 1 }}>
          {this.state.places.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>List Of All Places</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.places}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  view: {
    flex: 1,
    backgroundColor: "#deeeed",
  },
});
