<template>
  <div class="container">
    <header class="header-section">
      <font-awesome-layers class="icon" @click="openMenu">
        <font-awesome-icon icon="bars" size="lg" />
      </font-awesome-layers>
      <span>{{ name }}</span>

      <font-awesome-layers
        class="icon power"
        v-touch:tap="tapPower"
        v-touch:longtap="longtapPower"
      >
        <font-awesome-icon icon="power-off" size="lg" />
      </font-awesome-layers>
    </header>

    <div class="color-button-section">
      <div
        v-for="color of ['blue', 'red', 'green', 'yellow']"
        :key="color"
        :class="'button ' + color"
        @click="sendKey(VieraKey[color])"
      >
        <font-awesome-icon icon="cat" size="lg" />
      </div>
    </div>

    <div
      class="menu-section-overlay"
      v-show="visibleMenu"
      @click="closeMenu"
    ></div>
    <transition name="menu">
      <div
        class="menu-section-wrapper"
        v-show="visibleMenu"
        v-touch:swipe.left="closeMenu"
      >
        <nav class="menu-section">
          <font-awesome-layers class="icon close" @click="closeMenu">
            <font-awesome-icon icon="times" size="lg" />
          </font-awesome-layers>
          <ul class="list-group list-group-flush">
            <li class="list-group-item title">機能</li>
            <li
              v-for="button of MenuFunctionButtons"
              :key="button.key"
              class="list-group-item"
              @click="
                clickButton(button);
                closeMenu();
              "
            >
              <font-awesome-layers class="icon">
                <font-awesome-icon :icon="button.icon" size="lg" />
              </font-awesome-layers>
              <span class="label">{{ button.label }}</span>
            </li>
            <li class="list-group-item title">入力切替</li>
            <li
              v-for="button of MenuInputModeButtons"
              :key="button.key"
              class="list-group-item"
              @click="
                clickButton(button);
                closeMenu();
              "
            >
              <font-awesome-layers class="icon">
                <font-awesome-icon :icon="button.icon" size="lg" />
              </font-awesome-layers>
              <span class="label">{{ button.label }}</span>
            </li>
          </ul>
        </nav>
      </div>
    </transition>

    <swiper class="channel-section" :slides-per-view="1" :loop="true">
      <swiper-slide>
        <div class="buttons">
          <div
            v-for="channel of NumberButtons"
            :key="channel.key"
            class="channel-button"
            @click="clickButton(channel)"
          >
            <span class="text">{{ channel.label }}</span>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide v-for="(buttons, index) in AppButtons" :key="index">
        <div class="app-buttons">
          <div
            v-for="app of buttons"
            :key="app.productId"
            @click="clickButton(app)"
            class="app-button"
          >
            <img class="icon" :src="app.icon" :alt="app.label" />
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="buttons">
          <div
            v-for="channel of NamedButtons"
            :key="channel.key"
            class="channel-button"
            @click="clickButton(channel)"
          >
            <span class="text">{{ channel.label }}</span>
          </div>
        </div>
      </swiper-slide>

      <swiper-slide>
        <div class="updown">
          <div class="button">
            <font-awesome-layers class="icon" @click="sendKey(VieraKey.ch_up)">
              <font-awesome-icon icon="chevron-up" size="lg" />
            </font-awesome-layers>
            <div class="w-100 text-center">
              <span class="label py-3">Channel</span>
            </div>
            <font-awesome-layers
              class="icon"
              @click="sendKey(VieraKey.ch_down)"
            >
              <font-awesome-icon icon="chevron-down" size="lg" />
            </font-awesome-layers>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div class="control-section" v-touch:swipe.right="openMenu">
      <div class="position-relative">
        <transition name="volume">
          <div class="change-volume-section" v-show="visibleChangeVolume">
            <div class="change-volume-panel">
              <font-awesome-layers class="side" @click="toggleChangeVolume">
                <font-awesome-icon icon="volume-up" size="lg" />
              </font-awesome-layers>
              <div class="volume">
                <input
                  type="range"
                  class="input-range"
                  min="0"
                  max="50"
                  step="2"
                  v-model="volume"
                  @change="setVolume"
                />
              </div>
              <div class="side">
                <span class="text">{{ volume }}</span>
              </div>
            </div>
          </div>
        </transition>

        <div class="top-section">
          <font-awesome-layers class="icon" @click="toggleChangeVolume">
            <font-awesome-icon icon="volume-up" size="lg" />
          </font-awesome-layers>
          <font-awesome-layers @click="sendKey(VieraKey.mute)" class="icon">
            <font-awesome-icon icon="volume-mute" size="lg" />
          </font-awesome-layers>
        </div>
      </div>

      <div class="cursor-section">
        <div class="ok-inner" @click="sendKey(VieraKey.enter)">
          <span class="label">OK</span>
        </div>
        <div class="ok-outer"></div>
        <font-awesome-layers
          v-for="direction of ['right', 'down', 'left', 'up']"
          :key="direction"
          :class="direction"
          @click="sendKey(VieraKey[direction])"
        >
          <font-awesome-icon icon="caret-right" size="lg" />
        </font-awesome-layers>
      </div>

      <div class="bottom-section">
        <font-awesome-layers @click="sendKey(VieraKey.epg)" class="icon">
          <font-awesome-icon icon="newspaper" size="lg" />
        </font-awesome-layers>
        <font-awesome-layers @click="sendKey(VieraKey.back)" class="icon">
          <font-awesome-icon icon="arrow-circle-left" size="lg" />
        </font-awesome-layers>
      </div>
    </div>

    <div class="footer-section">
      <div
        v-for="button of FooterButtons"
        :key="button.key"
        class="button"
        @click="clickButton(button)"
      >
        <font-awesome-layers class="icon">
          <font-awesome-icon :icon="button.icon" />
        </font-awesome-layers>
        <span class="text">{{ button.label }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  FontAwesomeLayers,
  FontAwesomeIcon,
} from '@fortawesome/vue-fontawesome';
import { library as fontawesomeLibrary } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { VieraKey } from 'panasonic-viera-ts';
import { AxiosInstance, AxiosResponse } from 'axios';
import { defineComponent } from '@vue/runtime-core';
import { Swiper, SwiperSlide } from 'swiper/vue';
import {
  Button, MenuFunctionButtons, MenuInputModeButtons,
  NumberButtons, NamedButtons, FooterButtons, KeyButton, AppButton
} from '../buttons';
import 'swiper/swiper.scss';

fontawesomeLibrary.add(fas, fab);

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance;
  }
}

export default defineComponent({
  components: {
    'font-awesome-layers': FontAwesomeLayers,
    'font-awesome-icon': FontAwesomeIcon,
    Swiper, SwiperSlide
  },
  data() {
    return {
      id: this.$route.params.id,
      name: '',
      visibleChangeVolume: false,
      visibleMenu: false,
      volume: 0,
      AppButtons: [] as AppButton[][]
    };
  },
  setup() {
    return {
      VieraKey: VieraKey,
      MenuFunctionButtons: MenuFunctionButtons,
      MenuInputModeButtons: MenuInputModeButtons,
      NumberButtons: NumberButtons,
      NamedButtons: NamedButtons,
      FooterButtons: FooterButtons
    };
  },
  async created() {
    this.name = await this.getVieraName();
    this.volume = await this.getVolume();
    if (await this.isPowerOn()) {
      await this.setAppButtons();
    }
  },
  methods: {
    toggleChangeVolume() {
      this.visibleChangeVolume = !this.visibleChangeVolume;
    },
    openMenu() {
      if (!this.visibleChangeVolume) {
        this.visibleMenu = true;
      }
    },
    closeMenu() {
      this.visibleMenu = false;
    },
    tapPower() {
      this.togglePower(false);
    },
    longtapPower() {
      this.togglePower(true);
    },
    clickButton(button: Button) {
      if (this.isKeyButton(button)) {
        this.sendKey(button.key);
      } else {
        this.launchApp(button.productId);
      }
    },
    isKeyButton(button: Button): button is KeyButton {
      return button.hasOwnProperty('key');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chunkArray<T extends any[]>(arr: T, size: number): T[] {
      return arr.reduce(
        (newarr, _, i) => {
          if (!(i % size)) {
            newarr.push(arr.slice(i, i + size));
          }
          return newarr;
        },
        [] as T[][]
      );
    },
    async setAppButtons() {
      const response: AxiosResponse<AppButton[]> = await this.$api.get(`/${this.id}/app`);
      this.AppButtons = this.chunkArray(response.data, 4 * 3);
    },
    async getVieraName(): Promise<string> {
      const response = await this.$api.get(`/${this.id}/name`);
      return response.data.value;
    },
    async getVolume(): Promise<number> {
      const response = await this.$api.get(`/${this.id}/volume`);
      return response.data.value;
    },
    async isPowerOn(): Promise<boolean> {
      const response = await this.$api.get(`/${this.id}/power`);
      return response.data.value;
    },
    async togglePower(withSensor: boolean) {
      await this.$api.post(`/${this.id}/power`, { withSensor: withSensor });
      if (!this.AppButtons.length) {
        await this.setAppButtons();
      }
    },
    async sendKey(key: VieraKey) {
      console.log('sendKey:', key);
      await this.$api.post(`/${this.id}/key`, { value: key });
    },
    async launchApp(productId: string) {
      console.log('productId:', productId);
      await this.$api.post(`/${this.id}/app`, { value: productId });
    },
    async setVolume() {
      console.log('setVolume:', this.volume);
      await this.$api.post(`/${this.id}/volume`, { value: this.volume });
    },
  },
});
</script>
<style lang="scss">
body {
  font-family: system-ui;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
@import "../assets/scss/style.scss";
</style>
