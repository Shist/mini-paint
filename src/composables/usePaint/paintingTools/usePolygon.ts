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

  const drawPolygonPart = (
    ctx: Ref<CanvasRenderingContext2D | null>,
    newPosition?: { x: number; y: number }
  ) => {
    ctx.value?.beginPath();

    if (newPosition) {
      ctx.value?.moveTo(currPosition.x, currPosition.y);
      ctx.value?.lineTo(newPosition.x, newPosition.y);
    } else {
      ctx.value?.moveTo(startPosition.x, startPosition.y);
      ctx.value?.lineTo(currPosition.x, currPosition.y);
    }

    ctx.value?.stroke();
    ctx.value?.closePath();
  };

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

    drawPolygonPart(previewCanvasCtx, getPosition(e));
  };

  const polygonEndDrawing = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    const newPosition = getPosition(e);

    drawPolygonPart(paintingCanvasCtx, newPosition);

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
    drawPolygonPart(paintingCanvasCtx);

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
