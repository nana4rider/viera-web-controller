import { createApp } from 'vue';
import Vue3TouchEvents from 'vue3-touch-events';
import App from './App.vue';
import $api from './plugins/api';
import router from './route/index';

createApp(App).use(router).use(Vue3TouchEvents).use($api).mount('#app');
