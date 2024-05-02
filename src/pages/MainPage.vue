<template>
  <div class="main-page">
    <some-component />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SomeComponent from "@/components/SomeComponent.vue";

export default defineComponent({
  name: "main-page",
  components: {
    SomeComponent,
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.main-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>
