<template>
  <div class="sign-in-page">Sign In Page</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import useToast from "@/hooks/useToast";

export default defineComponent({
  name: "sign-in-page",
  setup() {
    const { setSuccessToast } = useToast();

    onMounted(() => {
      setSuccessToast("Testing of 1st hook...");
    });
  },
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
