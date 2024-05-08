import { ref, Ref, onMounted, watch } from "vue";
import { PAINT_TOOL_BTN_TYPES } from "@/constants";
import useBrush from "./useBrush";

export default function usePaint() {
  const paintingCanvas = ref(null) as Ref<HTMLCanvasElement | null>;
  const canvasCtx = ref(null) as Ref<CanvasRenderingContext2D | null>;
  const brushColor = ref("#000000");
  const brushWidth = ref("5");
  const activeToolBtn = ref(PAINT_TOOL_BTN_TYPES.BRUSH);
  const {
    brushStartDrawing,
    brushEndDrawing,
    brushStopDrawing,
    brushResumeDrawing,
    brushDraw,
  } = useBrush(paintingCanvas, canvasCtx);

  onMounted(() => {
    if (!paintingCanvas.value) {
      return;
    }

    canvasCtx.value = paintingCanvas.value.getContext("2d");

    if (!canvasCtx.value) {
      return;
    }

    canvasCtx.value.lineCap = "round";
    canvasCtx.value.strokeStyle = brushColor.value;
    canvasCtx.value.lineWidth = Number(brushWidth.value);
  });

  watch(brushColor, () => {
    if (canvasCtx.value) {
      canvasCtx.value.strokeStyle = brushColor.value;
    }
  });

  watch(brushWidth, () => {
    if (canvasCtx.value) {
      canvasCtx.value.lineWidth = Number(brushWidth.value);
    }
  });

  const onClickDown = (e: MouseEvent | TouchEvent) => {
    switch (activeToolBtn.value) {
      case PAINT_TOOL_BTN_TYPES.BRUSH:
        brushStartDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.LINE:
        break;
      case PAINT_TOOL_BTN_TYPES.CIRCLE:
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        break;
      case PAINT_TOOL_BTN_TYPES.STAR:
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        break;
    }
  };

  const onClickUp = () => {
    switch (activeToolBtn.value) {
      case PAINT_TOOL_BTN_TYPES.BRUSH:
        brushEndDrawing();
        break;
      case PAINT_TOOL_BTN_TYPES.LINE:
        break;
      case PAINT_TOOL_BTN_TYPES.CIRCLE:
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        break;
      case PAINT_TOOL_BTN_TYPES.STAR:
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        break;
    }
  };

  const onMouseLeave = () => {
    switch (activeToolBtn.value) {
      case PAINT_TOOL_BTN_TYPES.BRUSH:
        brushStopDrawing();
        break;
      case PAINT_TOOL_BTN_TYPES.LINE:
        break;
      case PAINT_TOOL_BTN_TYPES.CIRCLE:
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        break;
      case PAINT_TOOL_BTN_TYPES.STAR:
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        break;
    }
  };

  const onMouseEnter = (e: MouseEvent | TouchEvent) => {
    switch (activeToolBtn.value) {
      case PAINT_TOOL_BTN_TYPES.BRUSH:
        brushResumeDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.LINE:
        break;
      case PAINT_TOOL_BTN_TYPES.CIRCLE:
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        break;
      case PAINT_TOOL_BTN_TYPES.STAR:
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        break;
    }
  };

  const onMove = (e: MouseEvent | TouchEvent) => {
    switch (activeToolBtn.value) {
      case PAINT_TOOL_BTN_TYPES.BRUSH:
        brushDraw(e);
        break;
      case PAINT_TOOL_BTN_TYPES.LINE:
        break;
      case PAINT_TOOL_BTN_TYPES.CIRCLE:
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        break;
      case PAINT_TOOL_BTN_TYPES.STAR:
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        break;
    }
  };

  return {
    paintingCanvas,
    brushColor,
    brushWidth,
    activeToolBtn,
    onClickDown,
    onClickUp,
    onMouseLeave,
    onMouseEnter,
    onMove,
  };
}
