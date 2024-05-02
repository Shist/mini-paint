<template>
  <div class="not-found-page">
    <h1 class="not-found-page__headline">This page does not exist</h1>
    <router-link to="/" class="not-found-page__link-to-main">
      Back to the main page
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "not-found-page",
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.not-found-page {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 20px;
  &__headline {
    @include default-headline(48px, 48px, $color-black);
  }
  &__link-to-main {
    @include default-text(36px, 36px, $color-black);
    transition: 0.3s;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
