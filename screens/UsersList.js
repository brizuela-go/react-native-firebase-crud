import React, { useEffect, useState, useRef } from "react";
import { Button, StyleSheet } from "react-native";
import { ListItem, Avatar, Icon } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { onGetUsers } from "../database/firebase";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    onGetUsers((querySnapshot) => {
      const usuarios = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        usuarios.push({
          id: doc.id,
          name: user.nombre,
          email: user.email,
          phone: user.num_telefono,
        });
      });
      setUsers(usuarios);
    });
  }, []);

  return (
    <ScrollView>
      {console.log(users)}
      <Button
        title="Add New User"
        onPress={() => props.navigation.navigate("CreateUser")}
      ></Button>
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("UsersDetails", {
                userId: user.id,
              });
            }}
          >
            <AntDesign name="right" size={24} color="black" />

            <Avatar
              source={{
                uri: "https://randomuser.me/api/portraits/lego/6.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.name}</ListItem.Title>
              <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

export default UsersList;
