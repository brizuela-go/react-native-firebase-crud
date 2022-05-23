import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { addNewUser } from "../database/firebase";

const CreateUser = (props) => {
  const [property, setProperty] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChangeProperty = (name, value) => {
    setProperty({ ...property, [name]: value });
  };

  const addUser = () => {
    if (property.name == "" || property.email == "" || property.phone == "") {
      alert("Por favor, llene todos los campos...");
    } else {
      try {
        console.log(property);
        addNewUser(property.name, property.email, property.phone);
        alert("¡Usuario Creado con Éxito!");
        props.navigation.navigate("UsersList");
      } catch (error) {
        alert("Ha ocurrido un error", error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeProperty("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => handleChangeProperty("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone"
          onChangeText={(value) => handleChangeProperty("phone", value)}
        />
      </View>
      <View>
        <Button title="Add User" onPress={() => addUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    marginTop: 15,
    flex: 1,
    padding: 0,
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
});

export default CreateUser;
