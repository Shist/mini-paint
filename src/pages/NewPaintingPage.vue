<template>
  <div class="new-painting-page">
    <burger-menu />
    <h2 class="new-painting-page__headline">New painting</h2>
    <div class="new-painting-page__painting-wrapper">
      <canvas
        ref="paintingCanvas"
        id="painting-canvas"
        class="new-painting-page__painting-canvas"
        @mousedown.prevent="startDrawing"
        @mousemove.prevent="draw"
        @mouseup.prevent="endDrawing"
        @mouseout.prevent="stopDrawing"
        @mouseenter.prevent="resumeDrawing"
        @touchstart.prevent="startDrawing"
        @touchmove.prevent="draw"
        @touchend.prevent="endDrawing"
      ></canvas>
      <div class="new-painting-page__tools-wrapper">
        <div class="new-painting-page__brush-color-wrapper">
          <input
            v-model="brushColor"
            type="color"
            name="brush-color"
            class="new-painting-page__brush-color-input"
            id="brushColorInput"
          />
          <input
            v-model="brushWidth"
            type="range"
            min="1"
            max="10"
            name="brush-width"
            class="new-painting-page__brush-width-input"
            id="brushWidthInput"
          />
          <button
            class="new-painting-page__brush-btn"
            id="toolBtnBrush"
            :class="{ 'active-tool-btn': activeToolBtn === 'toolBtnBrush' }"
            @click="activeToolBtn = 'toolBtnBrush'"
          ></button>
        </div>
        <div class="new-painting-page__shapes-wrapper">
          <button
            class="new-painting-page__shape-btn new-painting-page__shape-btn_line"
            id="toolBtnLine"
            :class="{ 'active-tool-btn': activeToolBtn === 'toolBtnLine' }"
            @click="activeToolBtn = 'toolBtnLine'"
          ></button>
          <button
            class="new-painting-page__shape-btn new-painting-page__shape-btn_circle"
            id="toolBtnCircle"
            :class="{ 'active-tool-btn': activeToolBtn === 'toolBtnCircle' }"
            @click="activeToolBtn = 'toolBtnCircle'"
          ></button>
          <button
            class="new-painting-page__shape-btn new-painting-page__shape-btn_rectangle"
            id="toolBtnRectangle"
            :class="{ 'active-tool-btn': activeToolBtn === 'toolBtnRectangle' }"
            @click="activeToolBtn = 'toolBtnRectangle'"
          ></button>
          <button
            class="new-painting-page__shape-btn new-painting-page__shape-btn_star"
            id="toolBtnStar"
            :class="{ 'active-tool-btn': activeToolBtn === 'toolBtnStar' }"
            @click="activeToolBtn = 'toolBtnStar'"
          ></button>
          <button
            class="new-painting-page__shape-btn new-painting-page__shape-btn_polygon"
            id="toolBtnPolygon"
            :class="{ 'active-tool-btn': activeToolBtn === 'toolBtnPolygon' }"
            @click="activeToolBtn = 'toolBtnPolygon'"
          ></button>
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
      type="text"
      name="description"
      class="new-painting-page__description-textarea"
      id="descriptionTextarea"
      placeholder="Description of the image..."
      required
    ></textarea>
    <button class="new-painting-page__submit-btn">Submit painting</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, onUnmounted, watch } from "vue";
import BurgerMenu from "@/components/BurgerMenu.vue";

export default defineComponent({
  name: "new-painting-page",
  components: { BurgerMenu },
  setup() {
    const paintingCanvas = ref(null) as Ref<HTMLCanvasElement | null>;
    const brushColor = ref("#000000");
    const brushWidth = ref("5");
    const activeToolBtn = ref("toolBtnBrush");

    let canvasCtx = null as CanvasRenderingContext2D | null;
    let isDrawing = false;
    let isDrawingStopped = false;

    onMounted(() => {
      if (!paintingCanvas.value) {
        return;
      }

      canvasCtx = paintingCanvas.value.getContext("2d");

      if (!canvasCtx) {
        return;
      }

      canvasCtx.lineCap = "round";
      canvasCtx.strokeStyle = brushColor.value;
      canvasCtx.lineWidth = Number(brushWidth.value);

      window.addEventListener("mouseup", cancelDrawingStopping);
    });

    onUnmounted(() => {
      window.removeEventListener("mouseup", cancelDrawingStopping);
    });

    watch(brushColor, () => {
      if (canvasCtx) {
        canvasCtx.strokeStyle = brushColor.value;
      }
    });

    watch(brushWidth, () => {
      if (canvasCtx) {
        canvasCtx.lineWidth = Number(brushWidth.value);
      }
    });

    const getPosition = (e: MouseEvent | TouchEvent) => {
      if (!paintingCanvas.value) {
        return { x: 0, y: 0 };
      }

      const rect = paintingCanvas.value.getBoundingClientRect();
      const scaleX = paintingCanvas.value.width / rect.width;
      const scaleY = paintingCanvas.value.height / rect.height;

      if (e instanceof TouchEvent) {
        return {
          x: (e.targetTouches[0].clientX - rect.left) * scaleX,
          y: (e.targetTouches[0].clientY - rect.top) * scaleY,
        };
      } else {
        return {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      }
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      canvasCtx?.beginPath();
      draw(e);
    };

    const endDrawing = () => {
      isDrawing = false;
      canvasCtx?.closePath();
    };

    const stopDrawing = () => {
      if (isDrawing) {
        endDrawing();
        isDrawingStopped = true;
      }
    };

    function cancelDrawingStopping() {
      isDrawingStopped = false;
    }

    const resumeDrawing = (e: MouseEvent | TouchEvent) => {
      if (isDrawingStopped) {
        startDrawing(e);
        isDrawingStopped = false;
      }
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (isDrawing && canvasCtx) {
        const position = getPosition(e);
        canvasCtx.lineTo(position.x, position.y);
        canvasCtx.stroke();
      }
    };

    return {
      paintingCanvas,
      brushColor,
      brushWidth,
      activeToolBtn,
      startDrawing,
      endDrawing,
      stopDrawing,
      cancelDrawingStopping,
      resumeDrawing,
      draw,
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
    .new-painting-page__tools-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      @media (max-width: $tablet-s) {
        flex-direction: column;
      }
      .new-painting-page__brush-color-wrapper {
        display: flex;
        align-items: center;
        column-gap: 10px;
        .new-painting-page__brush-color-input {
          width: 70px;
          height: 40px;
        }
        .new-painting-page__brush-width-input {
          width: 100px;
          height: 30px;
        }
        .new-painting-page__brush-btn {
          width: 45px;
          height: 45px;
          background: transparent var(--canvas-tool-brush-img) no-repeat center /
            cover;
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
        }
      }
      .new-painting-page__shapes-wrapper {
        display: flex;
        align-items: center;
        column-gap: 8px;
        .new-painting-page__shape-btn {
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
          &_line {
            background: transparent var(--canvas-tool-line-img) no-repeat center /
              cover;
          }
          &_circle {
            background: transparent var(--canvas-tool-circle-img) no-repeat
              center / cover;
          }
          &_rectangle {
            background: transparent var(--canvas-tool-rectangular-img) no-repeat
              center / cover;
          }
          &_star {
            background: transparent var(--canvas-tool-star-img) no-repeat center /
              cover;
          }
          &_polygon {
            background: transparent var(--canvas-tool-polygon-img) no-repeat
              center / cover;
          }
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
