import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TodoListScreen } from "../screens/TodoList";
import { Article } from "../screens/Article";
import { Profile } from "../screens/Profile";
import { AuthSvg } from "../assets/svg/AuthSvg";
import { ListSvg } from "../assets/svg/ListSvg";
import { ArticleSvg } from "../assets/svg/ArticleSvg";
import { ProfileSvg } from "../assets/svg/ProfileSvg";
import LoginScreen from "../screens/LoginScreen";



const Tab = createBottomTabNavigator();


export const TabStack = () => {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Личный кабинет" component={Profile} options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size}) => <ProfileSvg color={focused ? "blue" : "#374b4e"} />,

      }} />
      <Tab.Screen name="TodoList" component={TodoListScreen} options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size}) => <ListSvg color={focused ? "blue" : "#374b4e"} />,
      }} />
      <Tab.Screen name="Article" component={Article} options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size}) => <ArticleSvg color={focused ? "blue" : "#374b4e"} />,
      }} />
    </Tab.Navigator>
  );
};


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#cc11"
//
//   }
// });
