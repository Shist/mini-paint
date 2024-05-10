<template>
  <div class="img-error">
    <img
      src="@/assets/images/img-error.png"
      alt="Error while loading image"
      class="img-error__icon"
    />
    <span class="img-error__message"
      >An error occurred while loading the image.</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "img-error",
});
</script>

<style scoped lang="scss">
@import "@/styles/global";

.img-error {
  align-self: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  &__icon {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
  &__message {
    @include default-text(20px, 20px, var(--color-error));
    @media (max-width: $tablet-l) {
      font-size: 16px;
      line-height: 16px;
    }
    @media (max-width: $phone-l) {
      font-size: 12px;
      line-height: 12px;
    }
  }
}
</style>
