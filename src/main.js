/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import axios_instance from "./constants/app-js/helper-axios.js";
import URLS from "./constants/app-js/urls.js";

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)

app.config.globalProperties.$api = {
  request_POST: (url, data = {}, onSuccess = null, onError = null) => {
    const headers = {
      token: sessionStorage.getItem("token")
    };

    axios_instance
      .post(url, data, { headers })
      .then((response) => {
        if (response.data.success === false) {
          console.error("Error:", response.data.message);
        }
        
        if (onSuccess) {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        console.error("POST request failed:", error);
        
        if (onError) {
          onError(error);
        }
      });
  },
};
app.config.globalProperties.$urls = URLS;

registerPlugins(app)

app.mount('#app')