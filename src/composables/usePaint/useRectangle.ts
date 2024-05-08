import { Ref } from "vue";
import usePosition from "@/composables/usePaint/usePosition";

export default function useRectangle(
  paintingCanvas: Ref<HTMLCanvasElement | null>,
  paintingCanvasCtx: Ref<CanvasRenderingContext2D | null>,
  previewCanvas: Ref<HTMLCanvasElement | null>,
  previewCanvasCtx: Ref<CanvasRenderingContext2D | null>
) {
  const { getPosition } = usePosition(paintingCanvas);

  let startPosition = { x: 0, y: 0 };
  let isStartSet = false;

  const rectangleStartDrawing = (e: MouseEvent | TouchEvent) => {
    startPosition = getPosition(e);
    isStartSet = true;
  };

  const rectangleDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (isStartSet && paintingCanvasCtx) {
      const newPosition = getPosition(e);
      const rectangleWidth = newPosition.x - startPosition.x;
      const rectangleHeight = newPosition.y - startPosition.y;
      previewCanvasCtx.value?.clearRect(
        0,
        0,
        previewCanvas.value ? previewCanvas.value?.width : 0,
        previewCanvas.value ? previewCanvas.value?.height : 0
      );
      previewCanvasCtx.value?.beginPath();
      previewCanvasCtx.value?.rect(
        startPosition.x,
        startPosition.y,
        rectangleWidth,
        rectangleHeight
      );
      previewCanvasCtx.value?.stroke();
      previewCanvasCtx.value?.closePath();
    }
  };

  function rectangleEndDrawing(e: MouseEvent | TouchEvent) {
    if (!isStartSet) {
      return;
    }

    previewCanvasCtx.value?.clearRect(
      0,
      0,
      previewCanvas.value ? previewCanvas.value?.width : 0,
      previewCanvas.value ? previewCanvas.value?.height : 0
    );

    isStartSet = false;
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
  }

  return {
    rectangleStartDrawing,
    rectangleDrawPreview,
    rectangleEndDrawing,
  };
}
