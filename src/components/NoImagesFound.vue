<template>
  <div class="no-images-found">
    <img
      src="@/assets/images/not-found.png"
      alt="Error while loading image"
      class="no-images-found__icon"
    />
    <span class="no-images-found__message">
      There are no any paintings found...
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "no-images-found",
});
</script>

<style scoped lang="scss">
@import "@/styles/global";

.no-images-found {
  align-self: center;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}
.no-images-found__icon {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
.no-images-found__message {
  @include default-text(26px, 26px, var(--color-text));
  text-align: center;
}
</style>
