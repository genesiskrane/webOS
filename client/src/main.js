import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service/index.js')
    .then((reg) => console.log('Service Worker registered:', reg))
    .catch((err) => console.error('Service Worker registration failed:', err))
}
