<template>
  <div class="global-container">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: "app",
};
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
