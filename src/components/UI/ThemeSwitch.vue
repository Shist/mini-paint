<template>
  <div class="theme-switch">
    <img
      src="@/assets/icons/light-dark-theme.svg"
      alt="Switch theme"
      class="theme-switch__icon"
    />
    <label class="theme-switch__label" for="theme-switch">
      <input
        type="checkbox"
        class="theme-switch__input"
        id="theme-switch"
        :checked="darkTheme"
        @change="darkTheme ? setDarkTheme(false) : setDarkTheme(true)"
      />
      <div class="theme-switch__slider"></div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { IMainStoreState } from "@/store";

export default defineComponent({
  name: "theme-switch",
  setup() {
    const store = useStore();

    const darkTheme = computed(() => store.state.darkTheme);
    const setDarkTheme = (newValue: IMainStoreState["darkTheme"]) => {
      store.commit("setDarkTheme", newValue);
    };

    return { darkTheme, setDarkTheme };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.theme-switch {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5px;
  &__icon {
    width: 50px;
    height: 50px;
  }
  &__label {
    position: relative;
    width: 60px;
    height: 34px;
    .theme-switch__input {
      display: none;
      &:checked + .theme-switch__slider {
        background-color: $color-light-black;
      }
      &:checked + .theme-switch__slider:before {
        transform: translateX(26px);
      }
    }
    .theme-switch__slider {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      cursor: pointer;
      background-color: $color-light-gray;
      border-radius: 34px;
      transition: 0.4s;
      &::before {
        content: "";
        height: 26px;
        width: 26px;
        position: absolute;
        bottom: 4px;
        left: 4px;
        background-color: $color-white;
        border-radius: 50%;
        transition: 0.4s;
      }
    }
  }
}
</style>
