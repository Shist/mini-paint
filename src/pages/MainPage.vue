<template>
  <div class="main-page">
    <burger-menu />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ComputedRef } from "vue";
import { useStore } from "vuex";
import BurgerMenu from "@/components/BurgerMenu.vue";
import useToast from "@/composables/useToast";
import { loadAllUsersPaintings } from "@/services/firebase";
import { IPainting } from "@/store/paintingsDataModule";

export default defineComponent({
  name: "main-page",
  components: { BurgerMenu },
  setup() {
    const store = useStore();

    const { setLoadingToast, removeCurrToast, setErrorToast } = useToast();

    const paintingsList: ComputedRef<IPainting[] | null> = computed(
      () => store.state.paintingsData.paintingsList
    );

    onMounted(async () => {
      if (paintingsList.value) {
        return;
      }

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
