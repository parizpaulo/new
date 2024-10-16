import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './assets/css/index.css';

import { createPinia } from 'pinia';
const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.mount('#app');
