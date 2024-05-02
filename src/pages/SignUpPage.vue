<template>
  <div class="sign-up-page">Sign Up Page</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "sign-up-page",
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.sign-up-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
