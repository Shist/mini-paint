<template>
  <div class="sign-in-page">Sign In Page</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "sign-in-page",
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.sign-in-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
