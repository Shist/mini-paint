import { Ref } from "vue";
import usePosition from "@/composables/usePaint/usePosition";
import useClearPreview from "@/composables/usePaint/useClearPreview";

export default function useRectangle(
  paintingCanvas: Ref<HTMLCanvasElement | null>,
  paintingCanvasCtx: Ref<CanvasRenderingContext2D | null>,
  previewCanvas: Ref<HTMLCanvasElement | null>,
  previewCanvasCtx: Ref<CanvasRenderingContext2D | null>
) {
  const { getPosition } = usePosition(paintingCanvas);
  const { clearPreviewCanvas } = useClearPreview(
    previewCanvas,
    previewCanvasCtx
  );

  let startPosition = { x: 0, y: 0 };
  let isStartSet = false;

  const drawRectangle = (
    e: MouseEvent | TouchEvent,
    ctx: Ref<CanvasRenderingContext2D | null>
  ) => {
    const newPosition = getPosition(e);

    const rectangleWidth = newPosition.x - startPosition.x;
    const rectangleHeight = newPosition.y - startPosition.y;

    ctx.value?.beginPath();
    ctx.value?.rect(
      startPosition.x,
      startPosition.y,
      rectangleWidth,
      rectangleHeight
    );
    ctx.value?.stroke();
    ctx.value?.closePath();
  };

  const rectangleStartDrawing = (e: MouseEvent | TouchEvent) => {
    startPosition = getPosition(e);
    isStartSet = true;
  };

  const rectangleDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    drawRectangle(e, previewCanvasCtx);
  };

  function rectangleEndDrawing(e: MouseEvent | TouchEvent) {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    drawRectangle(e, paintingCanvasCtx);

    isStartSet = false;
  }

  return {
    rectangleStartDrawing,
    rectangleDrawPreview,
    rectangleEndDrawing,
  };
}
