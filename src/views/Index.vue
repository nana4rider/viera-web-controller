<template>
  <div id="nav">
    <ul class="list-group">
      <li class="list-group-item" v-for="viera of Vieras" :key="viera.id">
        <router-link :to="'/viera/' + viera.id">{{ viera.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { AxiosInstance } from 'axios';
import { defineComponent } from '@vue/runtime-core';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}

interface Viera {
  id: number;
  name: string;
}

export default defineComponent({
  data() {
    return {
      Vieras: [] as Viera[]
    };
  },
  created() {
    this.getVieraName().then(vieras => {
      this.Vieras = vieras;
    });
  },
  methods: {
    async getVieraName(): Promise<Viera[]> {
      const response = await this.$api.get('/');
      return response.data;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>
