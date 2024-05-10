<template>
  <div class="painting-card">
    <span class="painting-card__date">Date: {{ date.toLocaleString() }}</span>
    <span class="painting-card__author">Author: {{ authorLabel }}</span>
    <span class="painting-card__description"
      >Description: {{ description }}</span
    >
    <img
      :src="imgSrc"
      :alt="`The painting of ${authorLabel}`"
      class="painting-card__img"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import {
  getStorage,
  ref as firbaseRef,
  getDownloadURL,
  getBlob,
} from "firebase/storage";

export default defineComponent({
  name: "painting-card",

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
    const imgSrc = ref("");

    const authorLabel = computed(() => {
      return `${props.authorName} (${props.authorEmail})`;
    });

    onMounted(async () => {
      const storage = getStorage();

      imgSrc.value = await getDownloadURL(firbaseRef(storage, props.imgPath));
    });

    return { imgSrc, authorLabel };
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
