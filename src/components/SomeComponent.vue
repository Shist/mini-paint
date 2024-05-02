<template>
  <div class="some-component">
    <h2 class="some-component__headline">This is some headline</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "some-component",
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.some-component {
  padding: 20px;
  &__headline {
    @include default-headline(36px, 36px, $color-black);
  }
}
</style>
