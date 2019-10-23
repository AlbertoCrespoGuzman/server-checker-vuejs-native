<template>
    
    <nb-container :style="{flex:1, backgroundColor: '#fff', padding: 0}">
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
            <nb-title>Servers</nb-title>
        </nb-body>
        <nb-right />
    </nb-header>
    <nb-content>
            <nb-list>
        <nb-list-item v-for="item in list_items" :key="item.id" :item="item" v-bind:class="{'green-box' : item.status === 'ok', 'red-box' : item.status != 'ok'}" >
          <view :style="{margin:10}">
              <text class="score-text">{{ item.name }}</text>
              <text v-if="item.status === 'ok'">Status 🥳 </text>
              <text v-else>Status 😵</text>
              <text>Last check: {{ date(item.updated_at) }}</text>
              <text>URL: {{ item.url_base }}</text>
              <text>END_POINT: {{ item.url_endpoint }}</text>
              <text>Requests: {{item.requests}}</text>
              <text>Errors: {{item.thrown_errors}}</text>
          </view>
          </nb-list>
        </nb-content>
        </nb-list-item >
    </nb-container>
</template>

<script>
import React from 'react';
import { Dimensions } from 'react-native';
import store from '../store';
import moment from 'moment'


const SCREEN_WIDTH = Dimensions.get('window').width;

export default {
  computed: {
    list_items () {
      return store.state.listItems;
    },
    
  },
  props: {
      navigation: Object
  },
  methods: {
    date(date) {
      if (date) {
        return moment(String(date)).format('DD/MM/YYYY hh:mm')
      }
    }
  }
  
};
</script>
<style>
.green-box{
  background-color: #42b98380;

}
.red-box{
  background-color: #bb000080;

}
.score-text {
  color: #ff6600;
  font-weight: bold;
  font-size: 18px;
}
</style>