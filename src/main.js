import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import createRouter from './router/router.js'
// import './styles/style.css'
import './assets/styles.scss'
import App from './App.vue'

const router = createRouter(createWebHistory())

const app = createApp(App)
app.use(router)
app.mount('#app')
