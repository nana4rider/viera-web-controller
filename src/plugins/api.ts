import axios from 'axios';
import { App } from 'vue';

export default {
  install: (app: App): void => {
    const axiosClient = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? '/viera/api' : '/api',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset="utf-8"'
      },
    });

    app.config.globalProperties.$api = axiosClient;
  }
};
