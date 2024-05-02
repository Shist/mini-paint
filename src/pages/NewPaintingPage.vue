<template>
  <div class="new-painting-page">
    <burger-menu />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BurgerMenu from "@/components/BurgerMenu.vue";

export default defineComponent({
  name: "new-painting-page",
  components: { BurgerMenu },
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.new-painting-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
