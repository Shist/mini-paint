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

  const rectangleStartDrawing = (e: MouseEvent | TouchEvent) => {
    startPosition = getPosition(e);
    isStartSet = true;
  };

  const rectangleDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    const newPosition = getPosition(e);
    const rectangleWidth = newPosition.x - startPosition.x;
    const rectangleHeight = newPosition.y - startPosition.y;

    previewCanvasCtx.value?.beginPath();
    previewCanvasCtx.value?.rect(
      startPosition.x,
      startPosition.y,
      rectangleWidth,
      rectangleHeight
    );
    previewCanvasCtx.value?.stroke();
    previewCanvasCtx.value?.closePath();
  };

  function rectangleEndDrawing(e: MouseEvent | TouchEvent) {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    const newPosition = getPosition(e);
    const rectangleWidth = newPosition.x - startPosition.x;
    const rectangleHeight = newPosition.y - startPosition.y;

    paintingCanvasCtx.value?.beginPath();
    paintingCanvasCtx.value?.rect(
      startPosition.x,
      startPosition.y,
      rectangleWidth,
      rectangleHeight
    );
    paintingCanvasCtx.value?.stroke();
    paintingCanvasCtx.value?.closePath();

    isStartSet = false;
  }

  return {
    rectangleStartDrawing,
    rectangleDrawPreview,
    rectangleEndDrawing,
  };
}
