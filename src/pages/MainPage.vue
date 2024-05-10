<template>
  <div class="main-page">
    <burger-menu />
    <h2 class="main-page__headline">Community paintings</h2>
    <div class="main-page__paintings-wrapper">
      <painting-card
        v-for="painting in paintingsList"
        :date="painting.date"
        :authorName="painting.authorName"
        :authorEmail="painting.authorEmail"
        :description="painting.description"
        :imgPath="painting.imgPath"
        :key="painting.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ComputedRef } from "vue";
import { useStore } from "vuex";
import BurgerMenu from "@/components/BurgerMenu.vue";
import PaintingCard from "@/components/PaintingCard.vue";
import useToast from "@/composables/useToast";
import { loadAllUsersPaintings } from "@/services/firebase";
import { IPainting } from "@/store/paintingsDataModule";

export default defineComponent({
  name: "main-page",
  components: { BurgerMenu, PaintingCard },
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

    return { paintingsList };
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
  &__headline {
    @include default-headline(42px, 42px, var(--color-text));
    margin-bottom: 10px;
    max-width: calc(100% - 50px);
    @media (max-width: $tablet-s) {
      font-size: 32px;
      line-height: 32px;
    }
  }
  &__paintings-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>
