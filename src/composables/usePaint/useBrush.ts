import { Ref } from "vue";
import usePosition from "@/composables/usePaint/usePosition";

export default function useBrush(
  paintingCanvas: Ref<HTMLCanvasElement | null>,
  paintingCanvasCtx: Ref<CanvasRenderingContext2D | null>
) {
  const { getPosition } = usePosition(paintingCanvas);

  let isDrawing = false;
  let isDrawingStopped = false;

  const brushStartDrawing = (e: MouseEvent | TouchEvent) => {
    isDrawing = true;
    paintingCanvasCtx.value?.beginPath();
    brushDraw(e);
  };

  const brushDraw = (e: MouseEvent | TouchEvent) => {
    if (isDrawing) {
      const position = getPosition(e);
      paintingCanvasCtx.value?.lineTo(position.x, position.y);
      paintingCanvasCtx.value?.stroke();
    }
  };

  const brushEndDrawing = () => {
    isDrawing = false;
    paintingCanvasCtx.value?.closePath();
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

  const brushCancelDrawingStopping = () => {
    isDrawingStopped = false;
  };

  return {
    brushStartDrawing,
    brushDraw,
    brushEndDrawing,
    brushStopDrawing,
    brushResumeDrawing,
    brushCancelDrawingStopping,
  };
}
