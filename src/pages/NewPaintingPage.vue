<template>
  <div class="new-painting-page">New Painting Page</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "new-painting-page",
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
