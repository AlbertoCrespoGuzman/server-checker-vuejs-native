<template>
      <app-navigation></app-navigation>
</template>


<script>
import React from "react";
import { Root } from "native-base";
import LoginScreen from "./screen/login.vue";
// import SignupScreen from "./screen/Signup/index.vue";
import HomeScreen from "./screen/home.vue";
import Sidebar from "./screen/sidebar.vue";
import ListItemScreen from './screen/listitems.vue'

import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
} from "vue-native-router";

/*
const Drawer = DrawerNavigator(
  {
    Home: { screen: HomeScreen },

  },
  {
    initialRouteName: "Home",
    contentComponent: props => <Sidebar {...props} />
  }
);
*/
const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen ,
    Listitems: ListItemScreen
  },
  {
    initialRouteName: 'Login',
  }
);

const StackNavigator = createStackNavigator(
  {
    Drawer: DrawerNavigator,
    Home: HomeScreen,
    Login: LoginScreen ,
    Listitems: ListItemScreen
  }
);

const AppNavigation = createAppContainer(StackNavigator);

export default {
  components: { AppNavigation }
};
</script> 