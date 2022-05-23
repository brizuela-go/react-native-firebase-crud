import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { deleteUser, onGetUser, updateUser } from "../database/firebase";

const UserDetails = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    email: "",
    num_telefono: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const removeUser = () => {
    deleteUser(user.id);
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Eliminando el Usuario",
      "¿Está seguro?",
      [
        { text: "Yes", onPress: () => removeUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const _updateUser = () => {
    updateUser(
      props.route.params.userId,
      user.nombre,
      user.email,
      user.num_telefono
    );
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    onGetUser(props.route.params.userId, (doc) => {
      const user = doc.data();
      setUser({ ...user, id: doc.id });
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.nombre}
          onChangeText={(value) => handleTextChange(value, "nombre")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="email"
          placeholder="Email"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Phone"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.num_telefono}
          onChangeText={(value) => handleTextChange(value, "num_telefono")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => _updateUser()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetails;
