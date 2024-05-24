<template>
  <button
    class="new-painting-page__tool-btn"
    :id="btnType"
    :class="[
      `new-painting-page__tool-btn_${btnStyleClass}`,
      { 'active-tool-btn': activeToolBtn === btnType },
    ]"
    @click="$emit('activeBtnChanged', btnType)"
  ></button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { PAINT_TOOL_BTN_TYPES } from "@/constants";

export default defineComponent({
  name: "btn-tool",

  props: {
    btnType: {
      type: String,
      required: true,
    },
    activeToolBtn: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const btnStyleClass = ref("");

    switch (props.btnType) {
      case PAINT_TOOL_BTN_TYPES.BRUSH:
        btnStyleClass.value = "brush";
        break;
      case PAINT_TOOL_BTN_TYPES.LINE:
        btnStyleClass.value = "line";
        break;
      case PAINT_TOOL_BTN_TYPES.ELLIPSE:
        btnStyleClass.value = "circle";
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        btnStyleClass.value = "rectangle";
        break;
      case PAINT_TOOL_BTN_TYPES.STAR:
        btnStyleClass.value = "star";
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        btnStyleClass.value = "polygon";
        break;
    }

    return { PAINT_TOOL_BTN_TYPES, btnStyleClass };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/global";

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
    background: transparent var(--canvas-tool-brush-img) no-repeat center /
      cover;
  }
  &_line {
    background: transparent var(--canvas-tool-line-img) no-repeat center / cover;
  }
  &_circle {
    background: transparent var(--canvas-tool-circle-img) no-repeat center /
      cover;
  }
  &_rectangle {
    background: transparent var(--canvas-tool-rectangular-img) no-repeat center /
      cover;
  }
  &_star {
    background: transparent var(--canvas-tool-star-img) no-repeat center / cover;
  }
  &_polygon {
    background: transparent var(--canvas-tool-polygon-img) no-repeat center /
      cover;
  }
}
</style>
