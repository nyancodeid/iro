<template>
  <div class="video-wrapper">
    <div class="video-wrapper--view" :class="`bg-${contrast}-contrast`">
      <video
        autoplay
        class="video-wrapper--view-video"
        ref="video_ctx"
      ></video>
      <canvas class="video-wrapper--view-canvas" ref="canvas_ctx"></canvas>

      <div class="color-indicator">
        <div class="color-indicator--label">
          <div
            class="color-indicator--label-color"
            :style="`background-color: #${hexColor}`"
          ></div>
          <div class="color-indicator--label-text">#{{ hexColor }}</div>
        </div>
        <div class="color-indicator--circle"></div>
      </div>

      <div class="helper-initialize" v-if="!isInitialized">
        <span>Start Camera</span>
      </div>
    </div>

    <div class="video-wrapper--control">
      <div
        class="video-control--torch icon icon-tunder--white"
        :class="{ disabled: !isTorchAvailable }"
        :disabled="!isTorchAvailable"
        @click="onToggleTorch"
      ></div>
      <div
        class="video-control--capture"
        :class="controlCaptureClass"
        @click="onCaptureColor"
      ></div>
      <div
        class="video-control--switch icon icon-switch--white"
        :class="{ disabled: !isSwitchAvailable }"
        :disabled="!isSwitchAvailable"
        @click="onSwitchCamera"
      ></div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";

import {colorConvert} from "@src/services/colors";
import {useAppStore, useDataStore} from "@src/store";

const DEFAULT_WIDTH = 436;
const DEFAULT_HEIGHT = 414;

export default {
  name: "VideoPicker",
  inject: ["notyf"],
  data() {
    return {
      isInitialized: false,
      color: [ 33, 33, 33 ],
      interval: null,
      cameraDevices: [],
      isTorch: false,
      isTorchAvailable: false,
      isSwitchAvailable: false,
    };
  },
  async mounted() {
    this.$refs.canvas_ctx.width = DEFAULT_WIDTH;
    this.$refs.canvas_ctx.height = DEFAULT_HEIGHT;
  },
  computed: {
    ...mapState(useAppStore, ["contrast"]),
    hexColor() {
      const color = colorConvert("rgb", this.color);
      return color.hex;
    },
    controlCaptureClass() {
      return {
        active: this.isInitialized,
        inactive: !this.isInitialized,
      };
    },
  },
  methods: {
    ...mapActions(useDataStore, ["addPicker"]),
    async initializeCamera(facingMode = "environment") {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.find(
        (device) =>
          device.kind === "videoinput" && device.label.indexOf("back") > 0
      );

      this.cameraDevices = devices
        .filter((device) => device.kind === "videoinput")
        .slice(0, 2);

      const constraints = {
        audio: false,
        video: true,
      };

      if (videoDevices) {
        this.isSwitchAvailable = devices.length > 1;

        constraints.video = {
          facingMode,
        };
      }

      return navigator.mediaDevices
        .getUserMedia(constraints)
        .then(this.handlerVideoSuccess)
        .catch(this.handleVideoError);
    },
    onCaptureColor() {
      if (!this.isInitialized) {
        this.initializeCamera().then(() => {
          // on initialize complete
        });
      } else {
        // Capture Color
        const hex = this.hexColor;

        this.addPicker({
          title: "HEX",
          type: "hex",
          value: hex,
          colorText: `#${hex}`,
          colorStyle: `#${hex}`,
        });
      }
    },
    onCapabilitiesReady(track) {
      if (typeof track.getCapabilities != "function") return false;

      const capabilities = track.getCapabilities();
      const setting = track.getSettings();

      this.isTorchAvailable = !!capabilities.torch;
      this.isTorch = !!setting.torch;
    },
    handlerVideoSuccess(stream) {
      const [track] = stream.getVideoTracks();
      const video = this.$refs.video_ctx;
      const canvas = this.$refs.canvas_ctx;

      window.stream = stream;
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        this.isInitialized = true;

        setTimeout(() => {
          this.onCapabilitiesReady(track);
        }, 500);
      };

      if (this.interval) {
        clearInterval(this.interval);
      }

      this.interval = setInterval(() => {
        const ctx = canvas.getContext("2d");

        ctx.drawImage(video, 0, 0, DEFAULT_HEIGHT, DEFAULT_WIDTH);

        const sx = DEFAULT_WIDTH / 2;
        const sy = DEFAULT_HEIGHT / 2;

        const imageData = ctx.getImageData(sx, sy, 1, 1);
        this.color = imageData.data.slice(0, 3);
      }, 100);
    },
    handleVideoError(error) {
      console.log(
        "navigator.MediaDevices.getUserMedia error: ",
        error.message,
        error.name
      );

      if (error.name === "NotAllowedError") {
        this.notyf.error(
          "Camera Permission is DENIED. Plase enable it to make function normally."
        );
      }

      this.isInitialized = false;
      this.stopInterval();
    },
    onSwitchCamera() {
      const video = this.$refs.video_ctx;

      const stream = video.srcObject;
      const [track] = stream.getVideoTracks();

      if (this.isSwitchAvailable) {
        const facingMode =
          track.getSettings().facingMode === "user" ? "environment" : "user";

        track.stop();

        this.initializeCamera(facingMode).catch((e) => {
          this.notyf.error("Error");
        });
      }
    },
    onToggleTorch() {
      const video = this.$refs.video_ctx;

      const stream = video.srcObject;
      const [track] = stream.getVideoTracks();

      if (this.isTorchAvailable) {
        track
          .applyConstraints({
            advanced: [{ torch: !this.isTorch }],
          })
          .then(() => {
            const setting = track.getSettings();

            this.isTorch = setting.torch;
          })
          .catch((e) => {
            this.notyf.error("Error while toggle torch/light");
          });
      }
    },
    stopInterval() {
      if (this.interval) {
        clearInterval(this.interval);
      }
    },
    stopVideoStream() {
      if (this.$refs?.video_ctx?.srcObject) {
        const stream = this.$refs.video_ctx.srcObject;
        const [track] = stream.getVideoTracks();

        track.stop();

        this.$refs.video_ctx.srcObject = null;
      }
    },
  },
  activated() {
    this.stopVideoStream();

    this.color = [ 33, 33, 33 ];
    this.isInitialized = false;
  },
  deactivated() {
    this.stopVideoStream();
    this.stopInterval();
  },
  beforeUnmount() {
    this.stopInterval();
  },
};
</script>

<style lang="scss">
$box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12),
  0 1px 3px 0 rgba(0, 0, 0, 0.2);

.video-wrapper {
  position: relative;
  width: 414px;
  margin: 0 2em;
  display: flex;
  flex-direction: column;

  .video-wrapper--view,
  .video-wrapper--view .video-wrapper--view-video {
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
  }

  .video-wrapper--view {
    .video-wrapper--view-video {
      width: 100%;
      height: 436px;

      object-fit: cover;
      object-position: 50% 50%;
      display: block;
    }
    .video-wrapper--view-canvas {
      display: none;
    }

    .color-indicator {
      top: 135px;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      .color-indicator--label {
        border-radius: 1.5em;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: white;

        padding: 8px;

        .color-indicator--label-color {
          box-shadow: $box-shadow;

          width: 32px;
          height: 32px;

          border-radius: 100%;
        }
        .color-indicator--label-text {
          color: #333;
          font-weight: bold;
          font-size: 1.4rem;

          margin-left: 8px;
          margin-right: 16px;
        }
      }

      .color-indicator--circle {
        margin-top: 1.5em;

        width: 24px;
        height: 24px;

        border-radius: 100%;
        background-color: rgba($color: #ffffff, $alpha: 0.5);
      }
    }
    .helper-initialize {
      bottom: 90px;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;

      > span {
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;

        border-radius: 1.5em;
        background-color: white;

        padding: 8px 16px;
        color: #313131;

        &:after {
          border: 1em solid transparent;
          border-top-color: white;
          content: "";
          margin-left: -1em;
          position: absolute;
          top: 100%;
          left: 50%;
          width: 0;
          height: 0;
        }
      }
    }
  }

  .video-wrapper--control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 398px;

    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;

    background-color: rgba($color: #000000, $alpha: 0.2);

    padding: 8px;

    .video-control--switch,
    .video-control--torch {
      margin: 0 1em;
      cursor: pointer;
    }
    .video-control--capture {
      border-radius: 100%;
      background-color: #ffffff;

      width: 42px;
      height: 42px;

      cursor: pointer;
      box-shadow: $box-shadow;

      border: 0.5em solid #ffffff;

      &.inactive {
        border: 0.5em solid #f44336;
      }
      &.active {
        border: 0.5em solid var(--primary-color);
        background-color: var(--secondary-color);
      }
    }
  }
}

.icon {
  &.icon-switch--white {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24px' viewBox='0 0 24 24' width='24px' fill='%23FFFFFF'%3E%3Cg%3E%3Cpath d='M0,0h24v24H0V0z' fill='none'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M16,7h-1l-1-1h-4L9,7H8C6.9,7,6,7.9,6,9v6c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V9C18,7.9,17.1,7,16,7z M16,15H8V9h1.83l1-1 h2.34l1,1H16V15z'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3Cpath d='M8.57,0.52L13.05,5l1.41-1.41l-1.54-1.54C17.7,2.46,21.53,6.24,22,11h2C23.36,3.3,15.79-1.67,8.57,0.52z'/%3E%3Cpath d='M9.54,20.41l1.54,1.54C6.3,21.54,2.47,17.76,2,13H0c0.64,7.7,8.21,12.67,15.43,10.48L10.95,19L9.54,20.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");

    &.disabled {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24px' viewBox='0 0 24 24' width='24px' fill='%23313131'%3E%3Cg%3E%3Cpath d='M0,0h24v24H0V0z' fill='none'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M16,7h-1l-1-1h-4L9,7H8C6.9,7,6,7.9,6,9v6c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V9C18,7.9,17.1,7,16,7z M16,15H8V9h1.83l1-1 h2.34l1,1H16V15z'/%3E%3Ccircle cx='12' cy='12' r='2'/%3E%3Cpath d='M8.57,0.52L13.05,5l1.41-1.41l-1.54-1.54C17.7,2.46,21.53,6.24,22,11h2C23.36,3.3,15.79-1.67,8.57,0.52z'/%3E%3Cpath d='M9.54,20.41l1.54,1.54C6.3,21.54,2.47,17.76,2,13H0c0.64,7.7,8.21,12.67,15.43,10.48L10.95,19L9.54,20.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
  }
  &.icon-tunder--white {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24px' viewBox='0 0 24 24' width='24px' fill='%23FFFFFF'%3E%3Cg%3E%3Crect fill='none' height='24' width='24'/%3E%3C/g%3E%3Cg%3E%3Cpath d='M11,21h-1l1-7H7.5c-0.88,0-0.33-0.75-0.31-0.78C8.48,10.94,10.42,7.54,13.01,3h1l-1,7h3.51c0.4,0,0.62,0.19,0.4,0.66 C12.97,17.55,11,21,11,21z'/%3E%3C/g%3E%3C/svg%3E");

    &.disabled {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24px' viewBox='0 0 24 24' width='24px' fill='%23313131'%3E%3Cg%3E%3Crect fill='none' height='24' width='24'/%3E%3C/g%3E%3Cg%3E%3Cpath d='M11,21h-1l1-7H7.5c-0.88,0-0.33-0.75-0.31-0.78C8.48,10.94,10.42,7.54,13.01,3h1l-1,7h3.51c0.4,0,0.62,0.19,0.4,0.66 C12.97,17.55,11,21,11,21z'/%3E%3C/g%3E%3C/svg%3E");
    }
  }
}
</style>
