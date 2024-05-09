import { Ref } from "vue";
import usePosition from "@/composables/usePaint/usePosition";
import useClearPreview from "@/composables/usePaint/useClearPreview";

export default function usePolygon(
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
  let currPosition = { x: 0, y: 0 };
  let isStartSet = false;

  let isClickDouble = false;
  let doubleClickTimerId = null as number | null;

  const polygonStartDrawing = (e: MouseEvent | TouchEvent) => {
    if (isStartSet) {
      return;
    }

    startPosition = getPosition(e);
    currPosition = startPosition;
    isStartSet = true;
  };

  const polygonDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    const newPosition = getPosition(e);

    previewCanvasCtx.value?.beginPath();
    previewCanvasCtx.value?.moveTo(currPosition.x, currPosition.y);
    previewCanvasCtx.value?.lineTo(newPosition.x, newPosition.y);
    previewCanvasCtx.value?.stroke();
    previewCanvasCtx.value?.closePath();
  };

  const polygonEndDrawing = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    const newPosition = getPosition(e);

    paintingCanvasCtx.value?.beginPath();
    paintingCanvasCtx.value?.moveTo(currPosition.x, currPosition.y);
    paintingCanvasCtx.value?.lineTo(newPosition.x, newPosition.y);
    paintingCanvasCtx.value?.stroke();
    paintingCanvasCtx.value?.closePath();

    currPosition = newPosition;

    if (doubleClickTimerId) {
      clearTimeout(doubleClickTimerId);
      doubleClickTimerId = null;
    }

    if (isClickDouble) {
      polygonEndAllDrawing();
    } else {
      isClickDouble = true;
      doubleClickTimerId = setTimeout(() => (isClickDouble = false), 300);
    }
  };

  const polygonEndAllDrawing = () => {
    paintingCanvasCtx.value?.beginPath();
    paintingCanvasCtx.value?.moveTo(startPosition.x, startPosition.y);
    paintingCanvasCtx.value?.lineTo(currPosition.x, currPosition.y);
    paintingCanvasCtx.value?.stroke();
    paintingCanvasCtx.value?.closePath();

    isStartSet = false;
    isClickDouble = false;
  };

  return {
    polygonStartDrawing,
    polygonDrawPreview,
    polygonEndDrawing,
    polygonEndAllDrawing,
  };
}
