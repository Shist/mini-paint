<template>
  <div class="img-skeleton">
    <img
      src="@/assets/images/img-loading.png"
      alt="The image is loading"
      class="img-skeleton__img-loading-icon"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "img-skeleton",
});
</script>

<style scoped lang="scss">
@import "@/styles/global";

.img-skeleton {
  padding: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-skeleton-bg);
  animation: pulse 1.5s ease-in-out infinite;
  &__img-loading-icon {
    width: 100%;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.8;
  }
}
</style>
