<template>
  <div class="painting-card">
    <span class="painting-card__date">Date: {{ date.toLocaleString() }}</span>
    <span class="painting-card__author">Author: {{ authorLabel }}</span>
    <span class="painting-card__description"
      >Description: {{ description }}</span
    >
    <img-skeleton v-if="currImgState === 'loading'" />
    <img
      v-show="currImgState === 'loaded'"
      :src="imgSrc"
      :alt="`The painting of ${authorLabel}`"
      class="painting-card__img"
      @load="handleImageSrcLoad"
      @error="handleImageSrcError"
    />
    <img-error v-if="currImgState === 'error'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, computed } from "vue";
import ImgSkeleton from "@/components/ImgSkeleton.vue";
import ImgError from "@/components/ImgError.vue";
import {
  getStorage,
  ref as firebaseRef,
  getDownloadURL,
} from "firebase/storage";

export default defineComponent({
  name: "painting-card",

  components: { ImgSkeleton, ImgError },

  props: {
    date: {
      type: Date,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    authorEmail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const currImgState = ref("loading");
    const imgSrc: Ref<string | undefined> = ref(undefined);

    const authorLabel = computed(() => {
      return `${props.authorName} (${props.authorEmail})`;
    });

    onMounted(async () => {
      const storage = getStorage();

      try {
        imgSrc.value = await getDownloadURL(
          firebaseRef(storage, props.imgPath)
        );
      } catch (error: unknown) {
        currImgState.value = "error";
      }
    });

    const handleImageSrcLoad = () => {
      currImgState.value = "loaded";
    };

    const handleImageSrcError = () => {
      if (imgSrc.value) {
        currImgState.value = "error";
      }
    };

    return {
      currImgState,
      imgSrc,
      authorLabel,
      handleImageSrcLoad,
      handleImageSrcError,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/global";

.painting-card {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--color-painting-card-bg);
  border-radius: 10px;
  &__date,
  &__author {
    @include default-text(22px, 22px, var(--color-text));
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    @media (max-width: $tablet-l) {
      font-size: 18px;
      line-height: 18px;
    }
    @media (max-width: $phone-l) {
      font-size: 14px;
      line-height: 14px;
    }
  }
  &__description {
    @include default-text(20px, 20px, var(--color-text));
    margin-bottom: 10px;
    word-break: break-word;
    @media (max-width: $tablet-l) {
      font-size: 16px;
      line-height: 16px;
    }
    @media (max-width: $phone-l) {
      font-size: 12px;
      line-height: 12px;
    }
  }
  &__img {
    padding: 10px;
    max-width: 100%;
    background-color: var(--color-canvas-bg);
  }
}
</style>
