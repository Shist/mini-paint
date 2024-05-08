import { ref, Ref, onMounted, onUnmounted, watch } from "vue";

export default function usePaint() {
  const paintingCanvas = ref(null) as Ref<HTMLCanvasElement | null>;
  const brushColor = ref("#000000");
  const brushWidth = ref("5");
  const activeToolBtn = ref("toolBtnBrush");

  let canvasCtx = null as CanvasRenderingContext2D | null;
  let isDrawing = false;
  let isDrawingStopped = false;

  const cancelDrawingStopping = () => {
    isDrawingStopped = false;
  };

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

  const onClickDown = (e: MouseEvent | TouchEvent) => {
    isDrawing = true;
    canvasCtx?.beginPath();
    onMove(e);
  };

  const onClickUp = () => {
    isDrawing = false;
    canvasCtx?.closePath();
  };

  const onMouseLeave = () => {
    if (isDrawing) {
      onClickUp();
      isDrawingStopped = true;
    }
  };

  const onMouseEnter = (e: MouseEvent | TouchEvent) => {
    if (isDrawingStopped) {
      onClickDown(e);
      isDrawingStopped = false;
    }
  };

  const onMove = (e: MouseEvent | TouchEvent) => {
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
    onClickDown,
    onClickUp,
    onMouseLeave,
    onMouseEnter,
    onMove,
  };
}