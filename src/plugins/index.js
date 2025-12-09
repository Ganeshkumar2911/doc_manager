/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import rules from '@/constants/rules'
export function registerPlugins (app) {
  app.config.globalProperties.$rules = rules
  app
    .use(vuetify)
    .use(router)
}
