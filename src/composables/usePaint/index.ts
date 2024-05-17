import { ref, reactive, Ref, onMounted, onUnmounted, watch } from "vue";
import { PAINT_TOOL_BTN_TYPES } from "@/constants";
import useBrush from "@/composables/usePaint/paintingTools/useBrush";
import useFigure from "@/composables/usePaint/paintingTools/useFigure";
import useLine from "@/composables/usePaint/paintingTools/useFigure/useLine";
import useEllipse from "@/composables/usePaint/paintingTools/useFigure/useEllipse";
import useRectangle from "@/composables/usePaint/paintingTools/useFigure/useRectangle";
import useStar from "@/composables/usePaint/paintingTools/useFigure/useStar";
import usePolygon from "@/composables/usePaint/paintingTools/usePolygon";

export default function usePaint() {
  const paintingCanvas = ref(null) as Ref<HTMLCanvasElement | null>;
  const paintingCanvasCtx = ref(null) as Ref<CanvasRenderingContext2D | null>;
  const previewCanvas = ref(null) as Ref<HTMLCanvasElement | null>;
  const previewCanvasCtx = ref(null) as Ref<CanvasRenderingContext2D | null>;

  const paintingHistory = reactive<ImageData[]>([]);

  const brushWidth = ref("10");
  const brushColor = ref("#000000");
  const fillColor = ref("#ffffff");
  const activeToolBtn = ref(PAINT_TOOL_BTN_TYPES.BRUSH);

  const {
    brushStartDrawing,
    brushEndDrawing,
    brushStopDrawing,
    brushResumeDrawing,
    brushDraw,
    brushCancelDrawingStopping,
  } = useBrush(paintingHistory, paintingCanvas, paintingCanvasCtx);

  const { drawLine } = useLine();
  const {
    figureStartDrawing: lineStartDrawing,
    figureDrawPreview: lineDrawPreview,
    figureEndDrawing: lineEndDrawing,
  } = useFigure(
    paintingHistory,
    paintingCanvas,
    paintingCanvasCtx,
    previewCanvas,
    previewCanvasCtx,
    drawLine
  );

  const { drawEllipse } = useEllipse();
  const {
    figureStartDrawing: ellipseStartDrawing,
    figureDrawPreview: ellipseDrawPreview,
    figureEndDrawing: ellipseEndDrawing,
  } = useFigure(
    paintingHistory,
    paintingCanvas,
    paintingCanvasCtx,
    previewCanvas,
    previewCanvasCtx,
    drawEllipse
  );

  const { drawRectangle } = useRectangle();
  const {
    figureStartDrawing: rectangleStartDrawing,
    figureDrawPreview: rectangleDrawPreview,
    figureEndDrawing: rectangleEndDrawing,
  } = useFigure(
    paintingHistory,
    paintingCanvas,
    paintingCanvasCtx,
    previewCanvas,
    previewCanvasCtx,
    drawRectangle
  );

  const { drawStar } = useStar();
  const {
    figureStartDrawing: starStartDrawing,
    figureDrawPreview: starDrawPreview,
    figureEndDrawing: starEndDrawing,
  } = useFigure(
    paintingHistory,
    paintingCanvas,
    paintingCanvasCtx,
    previewCanvas,
    previewCanvasCtx,
    drawStar
  );

  const {
    polygonStartDrawing,
    polygonDrawPreview,
    polygonEndDrawing,
    polygonEndAllDrawing,
  } = usePolygon(
    paintingHistory,
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
        starEndDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        polygonEndDrawing(e);
        break;
    }
  };

  const initCanvasSettings = (
    canvas: Ref<HTMLCanvasElement | null>,
    canvasCtx: Ref<CanvasRenderingContext2D | null>,
    isReadFrequently: boolean
  ) => {
    if (!canvas.value) {
      return;
    }

    const canvasRect = canvas.value.getBoundingClientRect();
    canvas.value.width = canvasRect.width;
    canvas.value.height = canvasRect.height;

    canvasCtx.value = canvas.value.getContext("2d", {
      willReadFrequently: isReadFrequently,
    });

    if (!canvasCtx.value) {
      return;
    }

    canvasCtx.value.lineCap = "round";
    canvasCtx.value.lineWidth = Number(brushWidth.value);
    canvasCtx.value.strokeStyle = brushColor.value;
    canvasCtx.value.fillStyle = fillColor.value;
  };

  const pushCleanCanvasStateToHistory = () => {
    if (paintingCanvasCtx.value) {
      const currentCanvasState = paintingCanvasCtx.value.getImageData(
        0,
        0,
        paintingCanvas.value ? paintingCanvas.value?.width : 0,
        paintingCanvas.value ? paintingCanvas.value?.height : 0
      );

      paintingHistory.push(currentCanvasState);
    }
  };

  onMounted(() => {
    window.addEventListener("mouseup", handleMouseUpOutsideCanvas);

    initCanvasSettings(paintingCanvas, paintingCanvasCtx, true);

    initCanvasSettings(previewCanvas, previewCanvasCtx, false);

    pushCleanCanvasStateToHistory();
  });

  onUnmounted(() => {
    window.removeEventListener("mouseup", handleMouseUpOutsideCanvas);
  });

  watch(brushWidth, () => {
    if (paintingCanvasCtx.value && previewCanvasCtx.value) {
      paintingCanvasCtx.value.lineWidth = Number(brushWidth.value);

      previewCanvasCtx.value.lineWidth = Number(brushWidth.value);
    }
  });

  watch(brushColor, () => {
    if (paintingCanvasCtx.value && previewCanvasCtx.value) {
      paintingCanvasCtx.value.strokeStyle = brushColor.value;

      previewCanvasCtx.value.strokeStyle = brushColor.value;
    }
  });

  watch(fillColor, () => {
    if (paintingCanvasCtx.value && previewCanvasCtx.value) {
      paintingCanvasCtx.value.fillStyle = fillColor.value;

      previewCanvasCtx.value.fillStyle = fillColor.value;
    }
  });

  watch(activeToolBtn, (newValue, oldValue) => {
    if (oldValue === PAINT_TOOL_BTN_TYPES.POLYGON) {
      polygonEndAllDrawing();
    }
  });

  const cleanCanvas = (e: MouseEvent) => {
    polygonEndDrawing(e);

    paintingHistory.splice(0, paintingHistory.length);

    paintingCanvasCtx.value?.clearRect(
      0,
      0,
      paintingCanvas.value ? paintingCanvas.value?.width : 0,
      paintingCanvas.value ? paintingCanvas.value?.height : 0
    );

    pushCleanCanvasStateToHistory();
  };

  const cleanLastPainting = (e: MouseEvent) => {
    polygonEndDrawing(e);

    if (paintingHistory.length > 1 && paintingCanvasCtx.value) {
      paintingHistory.pop();

      const currPaintingState = paintingHistory[paintingHistory.length - 1];

      paintingCanvasCtx.value.putImageData(currPaintingState, 0, 0);
    }
  };

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
        starStartDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        polygonStartDrawing(e);
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
        starDrawPreview(e);
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        polygonDrawPreview(e);
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
        starEndDrawing(e);
        break;
      case PAINT_TOOL_BTN_TYPES.POLYGON:
        polygonEndDrawing(e);
        break;
    }
  };

  const onMouseLeave = () => {
    if (activeToolBtn.value === PAINT_TOOL_BTN_TYPES.BRUSH) {
      brushStopDrawing();
    }
  };

  const onMouseEnter = (e: MouseEvent | TouchEvent) => {
    if (activeToolBtn.value === PAINT_TOOL_BTN_TYPES.BRUSH) {
      brushResumeDrawing(e);
    }
  };

  return {
    paintingCanvas,
    previewCanvas,
    brushWidth,
    brushColor,
    fillColor,
    activeToolBtn,
    cleanCanvas,
    cleanLastPainting,
    onClickDown,
    onMove,
    onClickUp,
    onMouseLeave,
    onMouseEnter,
  };
}
