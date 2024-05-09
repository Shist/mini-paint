<template>
  <div class="main-page">
    <burger-menu />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import BurgerMenu from "@/components/BurgerMenu.vue";
import useToast from "@/composables/useToast";
import { loadAllUsersPaintings } from "@/services/firebase";

export default defineComponent({
  name: "main-page",
  components: { BurgerMenu },
  setup() {
    const { setLoadingToast, removeCurrToast, setErrorToast } = useToast();

    onMounted(async () => {
      // TODO
      // if (this.paintings) {
      //   return;
      // }

      setLoadingToast("Loading paintings...");
      try {
        await loadAllUsersPaintings();

        removeCurrToast();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorToast(
            `An error occurred while trying to load paintings! ${error.message}`
          );
        }
      }
    });
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
