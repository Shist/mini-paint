<template>
  <div class="main-page">
    <burger-menu />
    <h2 class="main-page__headline">Community paintings</h2>
    <div v-show="isFilterVisible" class="main-page__filters-wrapper">
      <label class="main-page__author-name-input-label" for="authorNameInput">
        Only paintings of the author with name:
      </label>
      <input
        v-model="authorNameSearchStr"
        type="text"
        name="authorName"
        class="main-page__author-name-input"
        id="authorNameInput"
        placeholder="Name of the author"
      />
    </div>
    <div class="main-page__btns-wrapper">
      <button class="main-page__refresh-btn" @click="handlePaintingsLoading">
        Refresh
      </button>
      <button
        class="main-page__show-filters-btn"
        @click="isFilterVisible = !isFilterVisible"
      >
        {{ isFilterVisible ? "Hide filter" : "Show filter" }}
      </button>
    </div>
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
      <no-images-found
        v-show="!arePaintingsLoading && !paintingsList?.length"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, ComputedRef } from "vue";
import { useStore } from "vuex";
import BurgerMenu from "@/components/BurgerMenu.vue";
import PaintingCard from "@/components/PaintingCard.vue";
import NoImagesFound from "@/components/NoImagesFound.vue";
import useToast from "@/composables/useToast";
import { loadAllUsersPaintings } from "@/services/firebase";
import { IPainting } from "@/store/paintingsDataModule";

export default defineComponent({
  name: "main-page",
  components: { BurgerMenu, PaintingCard, NoImagesFound },
  setup() {
    const store = useStore();
    const authorNameSearchStr = ref("");
    const isFilterVisible = ref(false);
    const arePaintingsLoading = ref(true);

    const { setLoadingToast, removeCurrToast, setErrorToast } = useToast();

    const paintingsList: ComputedRef<IPainting[] | null> = computed(
      () => store.state.paintingsData.paintingsList
    );

    const handlePaintingsLoading = async () => {
      arePaintingsLoading.value = true;
      setLoadingToast("Loading paintings...");
      try {
        await loadAllUsersPaintings(authorNameSearchStr.value);

        removeCurrToast();
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setErrorToast(
            `An error occurred while trying to load paintings! ${error.message}`
          );
        }
      } finally {
        arePaintingsLoading.value = false;
      }
    };

    onMounted(() => {
      handlePaintingsLoading();
    });

    return {
      authorNameSearchStr,
      paintingsList,
      isFilterVisible,
      arePaintingsLoading,
      handlePaintingsLoading,
    };
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
  &__filters-wrapper {
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .main-page__author-name-input-label {
      @include default-text(26px, 26px, var(--color-text));
      @media (max-width: $phone-l) {
        font-size: 20px;
        line-height: 20px;
      }
    }
    .main-page__author-name-input {
      @extend %default-input;
    }
  }
  .main-page__btns-wrapper {
    margin-bottom: 20px;
    padding: 10px;
    display: flex;
    column-gap: 10px;
    @media (max-width: $phone-m) {
      padding: 5px;
      column-gap: 5px;
    }
    .main-page__refresh-btn {
      @include default-btn(110px, var(--color-btn-text), var(--color-btn-bg));
      text-decoration: none;
    }
    .main-page__show-filters-btn {
      @include default-btn(
        110px,
        var(--color-btn-text),
        var(--color-filter-btn-bg)
      );
      text-decoration: none;
    }
  }
  &__paintings-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
}
</style>
