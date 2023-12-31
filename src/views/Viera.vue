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
                  max="70"
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
          v-for="button of CursorButtons"
          :key="button.key"
          :class="button.label"
          v-touch:press="pressButton.bind(this, button)"
          v-touch:release="releaseButton.bind(this, button)"
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
        v-touch:press="pressButton.bind(this, button)"
        v-touch:release="releaseButton.bind(this, button)"
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
  NumberButtons, NamedButtons, FooterButtons, KeyButton, AppButton, CursorButtons
} from '../buttons';
import 'swiper/swiper.scss';
import deepEqual from 'deep-equal';

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
      AppButtons: [] as AppButton[][],
      pressedButton: undefined as Button | undefined,
      pressedCounter: 0
    };
  },
  setup() {
    return {
      VieraKey: VieraKey,
      MenuFunctionButtons: MenuFunctionButtons,
      MenuInputModeButtons: MenuInputModeButtons,
      NumberButtons: NumberButtons,
      NamedButtons: NamedButtons,
      FooterButtons: FooterButtons,
      CursorButtons: CursorButtons,
    };
  },
  async created() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.setAppButtons();
      }
    });

    this.name = await this.getVieraName();
    if (await this.isPowerOn()) {
      await this.setAppButtons();
    }
  },
  methods: {
    async toggleChangeVolume() {
      let visible = !this.visibleChangeVolume;
      if (visible) {
        this.volume = await this.getVolume();
      }
      this.visibleChangeVolume = visible;
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
      this.togglePower();
    },
    async clickButton(button: Button) {
      if (this.isKeyButton(button)) {
        await this.sendKey(button.key);
      } else {
        await this.launchApp(button.productId);
      }
    },
    async pressButton(button: Button) {
      console.log('pressButton');
      if (this.pressedButton) return;

      this.pressedButton = button;
      const sleep = (n: number) => new Promise(resolve => setTimeout(resolve, n));
      await sleep(1000);
      while (this.pressedButton) {
        this.pressedCounter++;
        await this.clickButton(button);
        await sleep(200);
      }
    },
    async releaseButton(button: Button) {
      console.log(this.pressedButton, button);
      if (!deepEqual(this.pressedButton, button)) return;

      this.pressedButton = undefined;
      if (this.pressedCounter === 0) {
        await this.clickButton(button);
      } else {
        this.pressedCounter = 0;
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
      if (this.AppButtons.length) return;
      const response: AxiosResponse<AppButton[]> = await this.$api.get(`/devices/${this.id}/command/apps`);
      this.AppButtons = this.chunkArray(response.data, 4 * 3);
    },
    async getVieraName(): Promise<string> {
      const response = await this.$api.get(`/devices/${this.id}`);
      return response.data.deviceName;
    },
    async getVolume(): Promise<number> {
      const response = await this.$api.get(`/devices/${this.id}/command/volume`);
      return response.data.value;
    },
    async isPowerOn(): Promise<boolean> {
      const response = await this.$api.get(`/devices/${this.id}/command/power`);
      return response.data.state === 'ON';
    },
    async togglePower() {
      await this.$api.put(`/devices/${this.id}/command/power`, { state: 'TOGGLE' });
      await this.setAppButtons();
    },
    async sendKey(key: VieraKey) {
      console.log('sendKey:', key);
      await this.$api.post(`/devices/${this.id}/command/sendKey/${key}`);
    },
    async launchApp(productId: string) {
      console.log('productId:', productId);
      await this.$api.post(`/devices/${this.id}/command/launchApp/${productId}`);
    },
    async setVolume() {
      this.volume = Number(this.volume);
      console.log('setVolume:', this.volume);
      await this.$api.put(`/devices/${this.id}/command/volume`, { value: this.volume });
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
