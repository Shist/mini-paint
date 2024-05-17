<template>
  <div class="new-painting-page">
    <burger-menu />
    <h2 class="new-painting-page__headline">New painting</h2>
    <div class="new-painting-page__painting-wrapper">
      <canvas
        ref="paintingCanvas"
        id="painting-canvas"
        class="new-painting-page__painting-canvas"
      ></canvas>
      <canvas
        ref="previewCanvas"
        id="preview-canvas"
        class="new-painting-page__preview-canvas"
        @mousedown.prevent="onClickDown"
        @mousemove.prevent="onMove"
        @mouseup.stop.prevent="onClickUp"
        @mouseout.prevent="onMouseLeave"
        @mouseenter.prevent="onMouseEnter"
        @touchstart.prevent="onClickDown"
        @touchmove.prevent="onMove"
        @touchend.prevent="onClickUp"
      ></canvas>
      <div class="new-painting-page__tools-wrapper">
        <div class="new-painting-page__btns-wrapper">
          <div class="new-painting-page__clean-btns-wrapper">
            <button
              class="new-painting-page__clean-btn new-painting-page__clean-btn_all"
              @click="cleanCanvas"
            ></button>
            <button
              class="new-painting-page__clean-btn new-painting-page__clean-btn_undo"
            ></button>
          </div>
          <div class="new-painting-page__tools-btns-wrapper">
            <button
              class="new-painting-page__tool-btn new-painting-page__tool-btn_brush"
              :id="PAINT_TOOL_BTN_TYPES.BRUSH"
              :class="{
                'active-tool-btn': activeToolBtn === PAINT_TOOL_BTN_TYPES.BRUSH,
              }"
              @click="activeToolBtn = PAINT_TOOL_BTN_TYPES.BRUSH"
            ></button>
            <button
              class="new-painting-page__tool-btn new-painting-page__tool-btn_line"
              :id="PAINT_TOOL_BTN_TYPES.LINE"
              :class="{
                'active-tool-btn': activeToolBtn === PAINT_TOOL_BTN_TYPES.LINE,
              }"
              @click="activeToolBtn = PAINT_TOOL_BTN_TYPES.LINE"
            ></button>
            <button
              class="new-painting-page__tool-btn new-painting-page__tool-btn_circle"
              :id="PAINT_TOOL_BTN_TYPES.ELLIPSE"
              :class="{
                'active-tool-btn':
                  activeToolBtn === PAINT_TOOL_BTN_TYPES.ELLIPSE,
              }"
              @click="activeToolBtn = PAINT_TOOL_BTN_TYPES.ELLIPSE"
            ></button>
            <button
              class="new-painting-page__tool-btn new-painting-page__tool-btn_rectangle"
              :id="PAINT_TOOL_BTN_TYPES.RECTANGLE"
              :class="{
                'active-tool-btn':
                  activeToolBtn === PAINT_TOOL_BTN_TYPES.RECTANGLE,
              }"
              @click="activeToolBtn = PAINT_TOOL_BTN_TYPES.RECTANGLE"
            ></button>
            <button
              class="new-painting-page__tool-btn new-painting-page__tool-btn_star"
              :id="PAINT_TOOL_BTN_TYPES.STAR"
              :class="{
                'active-tool-btn': activeToolBtn === PAINT_TOOL_BTN_TYPES.STAR,
              }"
              @click="activeToolBtn = PAINT_TOOL_BTN_TYPES.STAR"
            ></button>
            <button
              class="new-painting-page__tool-btn new-painting-page__tool-btn_polygon"
              :id="PAINT_TOOL_BTN_TYPES.POLYGON"
              :class="{
                'active-tool-btn':
                  activeToolBtn === PAINT_TOOL_BTN_TYPES.POLYGON,
              }"
              @click="activeToolBtn = PAINT_TOOL_BTN_TYPES.POLYGON"
            ></button>
          </div>
        </div>
        <div class="new-paintings-page__input-pickers-wrapper">
          <label
            for="brushWidthInput"
            class="new-painting-page__input-picker-label"
          >
            Brush thickness:
          </label>
          <input
            v-model="brushWidth"
            type="range"
            min="1"
            max="10"
            name="brush-width"
            class="new-painting-page__brush-width-input"
            id="brushWidthInput"
          />
          <label
            for="brushColorInput"
            class="new-painting-page__input-picker-label"
          >
            Brush color:
          </label>
          <input
            v-model="brushColor"
            type="color"
            name="brush-color"
            class="new-painting-page__color-input"
            id="brushColorInput"
          />
          <label
            for="fillColorInput"
            class="new-painting-page__input-picker-label"
          >
            Shapes fill color:
          </label>
          <input
            v-model="fillColor"
            type="color"
            name="fill-color"
            class="new-painting-page__color-input"
            id="fillColorInput"
          />
        </div>
      </div>
    </div>
    <label
      class="new-painting-page__description-textarea-label"
      for="descriptionTextarea"
    >
      Enter painting description below:
    </label>
    <textarea
      v-model="description"
      type="text"
      name="description"
      class="new-painting-page__description-textarea"
      id="descriptionTextarea"
      placeholder="Description of the image..."
      required
    ></textarea>
    <button
      class="new-painting-page__submit-btn"
      @click.prevent="onSubmitBtnClicked"
      :disabled="isLoading"
    >
      Submit painting
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import BurgerMenu from "@/components/BurgerMenu.vue";
import usePaint from "@/composables/usePaint";
import useToast from "@/composables/useToast";
import useValidationErrorMsg from "@/composables/useValidationErrorMsg";
import { uploadUserPainting, loadAllUsersPaintings } from "@/services/firebase";
import { PAINT_TOOL_BTN_TYPES } from "@/constants";

export default defineComponent({
  name: "new-painting-page",

  components: { BurgerMenu },

  setup() {
    const router = useRouter();

    const isLoading = ref(false);
    const description = ref("");

    const paintObj = usePaint();
    const { setLoadingToast, setSuccessToast, setErrorToast } = useToast();
    const { getDescriptionValidationError } = useValidationErrorMsg();

    const onSubmitBtnClicked = async () => {
      const errorMsg = getDescriptionValidationError(description.value);

      if (errorMsg) {
        setErrorToast(`Error! ${errorMsg}`);
        return;
      }

      isLoading.value = true;
      setLoadingToast("Submitting the painting...");
      try {
        const blob: Blob | null = await new Promise((resolve) =>
          paintObj.paintingCanvas.value?.toBlob(resolve)
        );

        if (blob === null) {
          throw new Error(
            "Error while creating Blob object from canvas: blob is null!"
          );
        }

        await uploadUserPainting(blob, description.value);

        description.value = "";

        await loadAllUsersPaintings();

        setSuccessToast("You have successfully submitted the painting!");

        router.push("/");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorToast(
            `An error occurred while trying to submit the painting! ${error.message}`
          );
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      ...paintObj,
      description,
      onSubmitBtnClicked,
      PAINT_TOOL_BTN_TYPES,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/global";

.new-painting-page {
  flex-grow: 1;
  @extend %default-wrapper;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__headline {
    @include default-headline(42px, 42px, var(--color-text));
    margin-bottom: 10px;
    text-align: center;
    @media (max-width: $phone-l) {
      align-self: flex-start;
      font-size: 32px;
      line-height: 32px;
    }
  }
  &__painting-wrapper {
    position: relative;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    .new-painting-page__painting-canvas {
      background-color: var(--color-canvas-bg);
      border: 2px solid var(--color-canvas-borders);
      max-height: 700px;
      max-width: 700px;
      height: calc(100dvw - 60px);
      width: calc(100dvw - 60px);
    }
    .new-painting-page__preview-canvas {
      position: absolute;
      background-color: transparent;
      border: 2px solid var(--color-canvas-borders);
      max-height: 700px;
      max-width: 700px;
      height: calc(100dvw - 60px);
      width: calc(100dvw - 60px);
    }
    .new-painting-page__tools-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 10px;
      .new-painting-page__btns-wrapper {
        display: flex;
        align-items: center;
        column-gap: 30px;
        @media (max-width: $phone-l) {
          flex-direction: column-reverse;
          row-gap: 10px;
        }
        .new-painting-page__clean-btns-wrapper {
          display: flex;
          align-items: center;
          column-gap: 8px;
          .new-painting-page__clean-btn {
            width: 45px;
            height: 45px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              transform: scale(1.05);
              box-shadow: 2px 4px 4px 0 rgba(var(--canvas-btn-shadow-rgb), 0.3);
            }
            @media (max-width: $tablet-s) {
              height: 40px;
              width: 40px;
            }
            &_all {
              background: transparent var(--canvas-clean-btn-img) no-repeat
                center / cover;
            }
            &_undo {
              background: transparent var(--canvas-undo-btn-img) no-repeat
                center / cover;
            }
          }
        }
        .new-painting-page__tools-btns-wrapper {
          display: flex;
          align-items: center;
          column-gap: 8px;
          .new-painting-page__tool-btn {
            width: 45px;
            height: 45px;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              transform: scale(1.05);
              box-shadow: 2px 4px 4px 0 rgba(var(--canvas-btn-shadow-rgb), 0.3);
            }
            @media (max-width: $tablet-s) {
              height: 40px;
              width: 40px;
            }
            @media (max-width: $phone-m) {
              height: 35px;
              width: 35px;
            }
            &_brush {
              background: transparent var(--canvas-tool-brush-img) no-repeat
                center / cover;
            }
            &_line {
              background: transparent var(--canvas-tool-line-img) no-repeat
                center / cover;
            }
            &_circle {
              background: transparent var(--canvas-tool-circle-img) no-repeat
                center / cover;
            }
            &_rectangle {
              background: transparent var(--canvas-tool-rectangular-img)
                no-repeat center / cover;
            }
            &_star {
              background: transparent var(--canvas-tool-star-img) no-repeat
                center / cover;
            }
            &_polygon {
              background: transparent var(--canvas-tool-polygon-img) no-repeat
                center / cover;
            }
          }
        }
      }
      .new-paintings-page__input-pickers-wrapper {
        display: grid;
        align-items: center;
        grid-template-columns: 1fr 1fr;
        gap: 10px 5px;
        grid-template-rows: repeat(3, auto);
        .new-painting-page__input-picker-label {
          @include default-text(24px, 24px, var(--color-text));
          text-align: end;
          @media (max-width: $phone-l) {
            font-size: 16px;
            line-height: 16px;
          }
        }
        .new-painting-page__brush-width-input {
          width: 100px;
          height: 30px;
        }
        .new-painting-page__color-input,
        .new-painting-page__color-input {
          width: 70px;
          height: 40px;
        }
      }
    }
  }
  &__description-textarea-label {
    @include default-text(24px, 24px, var(--color-text));
    max-width: 500px;
    width: 100%;
    @media (max-width: $phone-l) {
      font-size: 16px;
      line-height: 16px;
    }
  }
  &__description-textarea {
    @extend %default-textarea;
    margin-bottom: 20px;
  }
  &__submit-btn {
    @include default-btn(200px, var(--color-btn-text), var(--color-btn-bg));
  }
}
</style>
