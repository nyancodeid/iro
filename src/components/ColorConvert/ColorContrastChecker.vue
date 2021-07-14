<template>
  <div class="section contrast-checker--wrapper">
    <div class="label"><span class="heading">WCAG</span> result :</div>
    <div class="content">
      <div class="contrast-result--items">
        <div
          class="contrast-result--item aa-level--lg"
          :class="{
            passed: contrast.aa_lvl_lg,
            fail: !contrast.aa_lvl_lg,
            [color]: true,
          }"
        >
          <span class="item-subtitle">Large Text</span>
          <span class="item-title">AA</span>
        </div>
        <div
          class="contrast-result--item aa-level--sm"
          :class="{
            passed: contrast.aa_lvl_sm,
            fail: !contrast.aa_lvl_sm,
            [color]: true,
          }"
        >
          <span class="item-subtitle">Normal Text</span>
          <span class="item-title">AA</span>
        </div>
        <div
          class="contrast-result--item aaa-level--lg"
          :class="{
            passed: contrast.aaa_lvl_lg,
            fail: !contrast.aaa_lvl_lg,
            [color]: true,
          }"
        >
          <span class="item-subtitle">Large Text</span>
          <span class="item-title">AAA</span>
        </div>
        <div
          class="contrast-result--item aaa-level--sm"
          :class="{
            passed: contrast.aaa_lvl_sm,
            fail: !contrast.aaa_lvl_sm,
            [color]: true,
          }"
        >
          <span class="item-subtitle">Normal Text</span>
          <span class="item-title">AAA</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { calculateContrast } from "../../services/colors";

export default {
  name: "ColorContrastChecker",
  props: {
    color: String,
    foreground: Array,
    background: Array,
  },
  computed: {
    contrast() {
      return calculateContrast(this.foreground, this.background);
    },
  },
};
</script>

<style lang="scss">
.contrast-checker--wrapper {
  margin-top: 1rem;

  .label {
    margin-bottom: 0.5rem;
  }
  .content {
    width: 100%;

    .contrast-result--items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .contrast-result--item {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
        padding: 8px 14px;
        text-align: center;
        position: relative;

        &:not(:last-child) {
          margin-right: 8px;
        }

        &:after {
          content: "";
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 16px;
          height: 16px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
        }
        &.passed.white:after {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='16px' viewBox='0 0 24 24' width='16px' fill='%23FFFFFF'%3E%3Cg%3E%3Crect fill='none' height='24' width='24'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M23,11.99l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,11.99l2.44,2.79 l-0.34,3.7l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,11.99z M19.05,13.47l-0.56,0.65l0.08,0.85 l0.18,1.95l-1.9,0.43l-0.84,0.19l-0.44,0.74l-0.99,1.68l-1.78-0.77L12,18.85l-0.79,0.34l-1.78,0.77l-0.99-1.67l-0.44-0.74 l-0.84-0.19l-1.9-0.43l0.18-1.96l0.08-0.85l-0.56-0.65l-1.29-1.47l1.29-1.48l0.56-0.65L5.43,9.01L5.25,7.07l1.9-0.43l0.84-0.19 l0.44-0.74l0.99-1.68l1.78,0.77L12,5.14l0.79-0.34l1.78-0.77l0.99,1.68l0.44,0.74l0.84,0.19l1.9,0.43l-0.18,1.95l-0.08,0.85 l0.56,0.65l1.29,1.47L19.05,13.47z'/%3E%3Cpolygon points='10.09,13.75 7.77,11.42 6.29,12.91 10.09,16.72 17.43,9.36 15.95,7.87'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        &.passed.black:after {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='16px' viewBox='0 0 24 24' width='16px' fill='%23000000'%3E%3Cg%3E%3Crect fill='none' height='24' width='24'/%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M23,11.99l-2.44-2.79l0.34-3.69l-3.61-0.82L15.4,1.5L12,2.96L8.6,1.5L6.71,4.69L3.1,5.5L3.44,9.2L1,11.99l2.44,2.79 l-0.34,3.7l3.61,0.82L8.6,22.5l3.4-1.47l3.4,1.46l1.89-3.19l3.61-0.82l-0.34-3.69L23,11.99z M19.05,13.47l-0.56,0.65l0.08,0.85 l0.18,1.95l-1.9,0.43l-0.84,0.19l-0.44,0.74l-0.99,1.68l-1.78-0.77L12,18.85l-0.79,0.34l-1.78,0.77l-0.99-1.67l-0.44-0.74 l-0.84-0.19l-1.9-0.43l0.18-1.96l0.08-0.85l-0.56-0.65l-1.29-1.47l1.29-1.48l0.56-0.65L5.43,9.01L5.25,7.07l1.9-0.43l0.84-0.19 l0.44-0.74l0.99-1.68l1.78,0.77L12,5.14l0.79-0.34l1.78-0.77l0.99,1.68l0.44,0.74l0.84,0.19l1.9,0.43l-0.18,1.95l-0.08,0.85 l0.56,0.65l1.29,1.47L19.05,13.47z'/%3E%3Cpolygon points='10.09,13.75 7.77,11.42 6.29,12.91 10.09,16.72 17.43,9.36 15.95,7.87'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        &.fail.white:after {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16px' viewBox='0 0 24 24' width='16px' fill='%23FFFFFF'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z'/%3E%3C/svg%3E");
        }
        &.fail.black:after {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='16px' viewBox='0 0 24 24' width='16px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z'/%3E%3C/svg%3E");
        }

        > span {
          display: block;

          &.item-subtitle {
            font-size: 11.5px;
            margin-bottom: 0.25rem;
          }
          &.item-title {
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
