import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import BaseBlock from './components/BaseBlock.vue'
import BaseFooter from './components/BaseFooter.vue'
import BaseNavbar from './components/BaseNavbar.vue'
import { FontAwesomeIcon } from './plugins/font-awesome.js'


const app = createApp(App)
app.component('base-block', BaseBlock)
app.component('base-footer', BaseFooter)
app.component('base-navbar', BaseNavbar)
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app');
