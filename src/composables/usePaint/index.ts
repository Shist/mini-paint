import { ref, Ref, onMounted, onUnmounted, watch } from "vue";
import { PAINT_TOOL_BTN_TYPES } from "@/constants";
import useBrush from "@/composables/usePaint/useBrush";
import useLine from "@/composables/usePaint/useLine";
import useEllipse from "@/composables/usePaint/useEllipse";
import useRectangle from "@/composables/usePaint/useRectangle";

export default function usePaint() {
  const paintingCanvas = ref(null) as Ref<HTMLCanvasElement | null>;
  const paintingCanvasCtx = ref(null) as Ref<CanvasRenderingContext2D | null>;
  const previewCanvas = ref(null) as Ref<HTMLCanvasElement | null>;
  const previewCanvasCtx = ref(null) as Ref<CanvasRenderingContext2D | null>;

  const brushColor = ref("#000000");
  const brushWidth = ref("5");
  const activeToolBtn = ref(PAINT_TOOL_BTN_TYPES.BRUSH);

  const {
    brushStartDrawing,
    brushEndDrawing,
    brushStopDrawing,
    brushResumeDrawing,
    brushDraw,
    brushCancelDrawingStopping,
  } = useBrush(paintingCanvas, paintingCanvasCtx);

  const { lineStartDrawing, lineEndDrawing, lineDrawPreview } = useLine(
    paintingCanvas,
    paintingCanvasCtx,
    previewCanvas,
    previewCanvasCtx
  );

  const { ellipseStartDrawing, ellipseDrawPreview, ellipseEndDrawing } =
    useEllipse(
      paintingCanvas,
      paintingCanvasCtx,
      previewCanvas,
      previewCanvasCtx
    );

  const { rectangleStartDrawing, rectangleDrawPreview, rectangleEndDrawing } =
    useRectangle(
      paintingCanvas,
      paintingCanvasCtx,
      previewCanvas,
      previewCanvasCtx
    );

  const handleMouseUpOutsideCanvas = (e: MouseEvent) => {
    switch (activeToolBtn.value) {
      case PAINT_TOOL_BTN_TYPES.BRUSH:
        brushCancelDrawingStopping();
        break;
      case PAINT_TOOL_BTN_TYPES.LINE:
        lineEndDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.ELLIPSE:
        ellipseEndDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        rectangleEndDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.STAR:
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        break;
    }
  };

  onMounted(() => {
    window.addEventListener("mouseup", handleMouseUpOutsideCanvas);

    if (!paintingCanvas.value || !previewCanvas.value) {
      return;
    }

    const paintingCanvasRect = paintingCanvas.value.getBoundingClientRect();
    paintingCanvas.value.width = paintingCanvasRect.width;
    paintingCanvas.value.height = paintingCanvasRect.height;

    const previewCanvasRect = previewCanvas.value.getBoundingClientRect();
    previewCanvas.value.width = previewCanvasRect.width;
    previewCanvas.value.height = previewCanvasRect.height;

    paintingCanvasCtx.value = paintingCanvas.value.getContext("2d");

    previewCanvasCtx.value = previewCanvas.value.getContext("2d");

    if (!paintingCanvasCtx.value || !previewCanvasCtx.value) {
      return;
    }

    paintingCanvasCtx.value.lineCap = "round";
    paintingCanvasCtx.value.strokeStyle = brushColor.value;
    paintingCanvasCtx.value.lineWidth = Number(brushWidth.value);

    previewCanvasCtx.value.lineCap = "round";
    previewCanvasCtx.value.strokeStyle = brushColor.value;
    previewCanvasCtx.value.lineWidth = Number(brushWidth.value);
  });

  onUnmounted(() => {
    window.removeEventListener("mouseup", handleMouseUpOutsideCanvas);
  });

  watch(brushColor, () => {
    if (paintingCanvasCtx.value && previewCanvasCtx.value) {
      paintingCanvasCtx.value.strokeStyle = brushColor.value;

      previewCanvasCtx.value.strokeStyle = brushColor.value;
    }
  });

  watch(brushWidth, () => {
    if (paintingCanvasCtx.value && previewCanvasCtx.value) {
      paintingCanvasCtx.value.lineWidth = Number(brushWidth.value);

      previewCanvasCtx.value.lineWidth = Number(brushWidth.value);
    }
  });

  const onClickDown = (e: MouseEvent | TouchEvent) => {
    switch (activeToolBtn.value) {
      case PAINT_TOOL_BTN_TYPES.BRUSH:
        brushStartDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.LINE:
        lineStartDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.ELLIPSE:
        ellipseStartDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        rectangleStartDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.STAR:
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        break;
    }
  };

  const onClickUp = (e: MouseEvent | TouchEvent) => {
    switch (activeToolBtn.value) {
      case PAINT_TOOL_BTN_TYPES.BRUSH:
        brushEndDrawing();
        break;
      case PAINT_TOOL_BTN_TYPES.LINE:
        lineEndDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.ELLIPSE:
        ellipseEndDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        rectangleEndDrawing(e);
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
      case PAINT_TOOL_BTN_TYPES.ELLIPSE:
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
      case PAINT_TOOL_BTN_TYPES.ELLIPSE:
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
        lineDrawPreview(e);
        break;
      case PAINT_TOOL_BTN_TYPES.ELLIPSE:
        ellipseDrawPreview(e);
        break;
      case PAINT_TOOL_BTN_TYPES.RECTANGLE:
        rectangleDrawPreview(e);
        break;
      case PAINT_TOOL_BTN_TYPES.STAR:
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        break;
    }
  };

  return {
    paintingCanvas,
    previewCanvas,
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
