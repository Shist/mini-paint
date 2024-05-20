<template>
  <div class="theme-switch">
    <img
      src="@/assets/images/light-dark-theme.png"
      alt="Switch theme"
      class="theme-switch__icon"
    />
    <label class="theme-switch__label" for="theme-switch">
      <input
        type="checkbox"
        class="theme-switch__input"
        id="theme-switch"
        aria-hidden="true"
        aria-label="Change color theme"
        :checked="theme === 'dark'"
        @change="
          theme === 'dark' ? setCurrTheme('light') : setCurrTheme('dark')
        "
      />
      <div class="theme-switch__slider"></div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { IThemeState } from "@/store/themeModule";

export default defineComponent({
  name: "theme-switch",

  setup() {
    const store = useStore();

    const theme = computed(() => store.state.theme.currTheme);
    const setCurrTheme = (newValue: IThemeState["currTheme"]) => {
      store.commit("theme/setCurrTheme", newValue);
    };

    return { theme, setCurrTheme };
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
        background-color: var(--color-theme-slider-dark);
      }
      &:checked + .theme-switch__slider::before {
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
      background-color: var(--color-theme-slider-light);
      border-radius: 34px;
      transition: 0.4s;
      &::before {
        content: "";
        height: 26px;
        width: 26px;
        position: absolute;
        bottom: 4px;
        left: 4px;
        background-color: var(--color-theme-slider-circle);
        border-radius: 50%;
        transition: 0.4s;
      }
    }
  }
}
</style>
