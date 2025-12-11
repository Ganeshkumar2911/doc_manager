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
          <div class="search-box-wrapper">
            <div class="search-box-icon-wrapper">
              <v-icon size="20" class="search-box-icon">mdi-magnify</v-icon>
            </div>
            <input
              v-model="display_search_text"
              v-on:keyup.enter="saveSearchText()"
              type="text"
              class="search-box-text"
              placeholder="Search..."
            />
            <button
              v-if="display_search_text"
              class="close-btn"
              @click="clearSearchText()"
            >
              <v-icon class="close-icon">
                mdi-window-close
              </v-icon>
            </button>
            <div class="search-instruction">
              ** Press ENTER to search
            </div>
          </div>
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
        display_search_text: ''
      };
    },
    methods: {
      saveSearchText() {
        this.$store.dispatch("setSearchText", this.display_search_text);
      },
      clearSearchText() {
        this.display_search_text = "";
        this.$store.dispatch("setSearchText", "");
      },
    }
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
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    z-index: 2;
  }
  .color {
    background-color: #2f80ed;
    color: white;
    font-weight: 900;
  }

  .search-box-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 20px;
    min-width: 300px;
    max-width: 400px;
  }

  .search-box-icon-wrapper {
    position: absolute;
    top: 15px;
    left: 8px;
    padding: 2px;
    border-radius: 50%;
    background: #eef5fb !important;
    box-shadow: 6px 6px 12px #dbe1e7, -6px -6px 12px #ffffff !important;
    border: 1px solid #a9d7ff57 !important;
    display: grid;
    place-items: center;
  }

  .search-box-icon {
    color: #666;
  }

  .search-box-text {
    width: 350px;
    padding: 10px 15px 10px 50px;
    margin-top: 5px;
    border-radius: 20px;
    background: #e3edf7;
    height: fit-content !important;
    box-shadow: inset 6px 6px 12px #dbe1e7, inset -6px -6px 12px #ffffff;
    border: 1px solid #a9d7ff57 !important;
  }

  .search-box-text:focus {
    border-color: #2f80ed;
  }

  .close-btn {
    position: absolute;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 4px;
    z-index: 1;
  }

  .close-icon {
    color: #666;
    font-size: 18px;
  }

  .close-btn:hover .close-icon {
    color: #333;
  }

  .search-instruction {
    position: absolute;
    top: 100%;
    right: 0;
    font-size: 11px;
    color: #999;
    margin-top: 4px;
    white-space: nowrap;
  }
  </style>
  