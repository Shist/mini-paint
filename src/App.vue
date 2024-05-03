<template>
  <div class="global-container" :class="{ 'dark-theme': theme === 'dark' }">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "app",
  setup() {
    const store = useStore();

    const theme = computed(() => store.state.theme);

    return { theme };
  },
});
</script>

<style lang="scss">
@import "@/styles/global";
@import "vue3-toastify/dist/index.css";

.Toastify__toast {
  cursor: default;
}
.Toastify__toast-body > div {
  cursor: text;
  font-family: $font-roboto;
  text-align: center;
}
</style>
