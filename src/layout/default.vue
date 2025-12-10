<template>
    <div class="dashboard">
      <v-navigation-drawer width="180">
        <div>
          <v-img
            class="my-0"
            src="@/assets/logo.webp"
            alt=""
            height="134"
          />
        </div>
        <div class="drawerContent">
          <v-list>
            <v-list-item to="/documents" active-class="color">
              <v-list-item-title>Documents</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
        <div class="drawerFotter">
          <v-btn
            :ripple="false"
            height="50"
            min-width="120"
            variants="outlined"
            class="border"
            
          >
            Logout
          </v-btn>
        </div>
      </v-navigation-drawer>
      <div class="main">
        <div class="topBar">
          <h3 class="mx-4">{{$route.meta.title}}</h3>
        </div>
        <div class="content">
          <router-view class="routerView"></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
      };
    },
  };
  </script>
  
  <style scoped>
  .drawerContent {
    height: 70%;
    width: 100%;
  }
  
  .drawerFotter {
    flex: 1;
    padding-top: 5px;
    display: flex;
    justify-content: center;
  }
 
  .topBar {
    height: 6vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }
  .color {
    background-color: #2f80ed;
    color: white;
    font-weight: 900;
  }
  </style>
  