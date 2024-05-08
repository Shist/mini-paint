import { Ref, onMounted, onUnmounted } from "vue";
import usePosition from "@/composables/usePaint/usePosition";

export default function useBrush(
  paintingCanvas: Ref<HTMLCanvasElement | null>,
  canvasCtx: Ref<CanvasRenderingContext2D | null>
) {
  const { getPosition } = usePosition(paintingCanvas);

  let isDrawing = false;
  let isDrawingStopped = false;

  const cancelDrawingStopping = () => {
    isDrawingStopped = false;
  };

  onMounted(() => {
    window.addEventListener("mouseup", cancelDrawingStopping);
  });

  onUnmounted(() => {
    window.removeEventListener("mouseup", cancelDrawingStopping);
  });

  const brushStartDrawing = (e: MouseEvent | TouchEvent) => {
    isDrawing = true;
    canvasCtx.value?.beginPath();
    brushDraw(e);
  };

  const brushEndDrawing = () => {
    isDrawing = false;
    canvasCtx.value?.closePath();
  };

  const brushStopDrawing = () => {
    if (isDrawing) {
      brushEndDrawing();
      isDrawingStopped = true;
    }
  };

  const brushResumeDrawing = (e: MouseEvent | TouchEvent) => {
    if (isDrawingStopped) {
      brushStartDrawing(e);
      isDrawingStopped = false;
    }
  };

  const brushDraw = (e: MouseEvent | TouchEvent) => {
    if (isDrawing && canvasCtx) {
      const position = getPosition(e);
      canvasCtx.value?.lineTo(position.x, position.y);
      canvasCtx.value?.stroke();
    }
  };

  return {
    brushStartDrawing,
    brushEndDrawing,
    brushStopDrawing,
    brushResumeDrawing,
    brushDraw,
  };
}
