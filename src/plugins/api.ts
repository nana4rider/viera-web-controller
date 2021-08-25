import axios from 'axios';
import { App } from 'vue';

export default {
  install: (app: App): void => {
    const axiosClient = axios.create({
      baseURL: '/api/viera',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset="utf-8"'
      },
    });

    app.config.globalProperties.$api = axiosClient;
  }
};
