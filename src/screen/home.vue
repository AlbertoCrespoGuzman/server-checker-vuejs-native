<template>
    <nb-container :style="{flex:1, backgroundColor: '#fff'}">
        <nb-header>
          <nb-left>
            <nb-button
              transparent
              :on-press="() => navigation.navigate('Drawer')"
            >
            <nb-icon name="menu" />
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-title>Servers List</nb-title>
            </nb-body>
            <nb-right />
        </nb-header>
        <nb-content>
            <nb-list>
                <item
                    v-if="!loading"
                    v-for="(itemType, types) in items"
                    :data="itemType" :navigation="navigation"/>
                <nb-spinner v-if="loading"></nb-spinner>
            </nb-list>
            
        </nb-content>
    </nb-container>
</template>

<script>
import React from 'react';
import Item from '../components/item';
import { Dimensions } from 'react-native';
import store from '../store';
import { NavigationActions, StackActions } from 'react-navigation';

const SCREEN_WIDTH = Dimensions.get('window').width;
const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: "Login"})]
                    })

export default {
  computed: {
    items () {
      return store.state.posts;
    },
    loading () {
        console.log(store.state)
        return store.state.loadingPosts;
    }
  },
  props: {
      navigation: Object
  },
  created () {
    this.fetchList('/todos');
  },
  methods: {
    fetchList (type) {
      return store.dispatch('FETCH_LIST_DATA', {
        type: type
      }).then(res => {
          
      }).catch(err =>{
         store.dispatch('LOGOUT', () => this.navigation.dispatch(resetAction))
      });
    }
  },
  components: {
      Item
  }
};
</script>