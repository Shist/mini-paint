import { Ref } from "vue";
import usePosition from "@/composables/usePaint/usePosition";
import useClearPreview from "@/composables/usePaint/useClearPreview";

export default function useLine(
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

  const lineStartDrawing = (e: MouseEvent | TouchEvent) => {
    startPosition = getPosition(e);
    isStartSet = true;
  };

  const lineDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    const newPosition = getPosition(e);

    previewCanvasCtx.value?.beginPath();
    previewCanvasCtx.value?.moveTo(startPosition.x, startPosition.y);
    previewCanvasCtx.value?.lineTo(newPosition.x, newPosition.y);
    previewCanvasCtx.value?.stroke();
    previewCanvasCtx.value?.closePath();
  };

  const lineEndDrawing = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    const newPosition = getPosition(e);

    paintingCanvasCtx.value?.beginPath();
    paintingCanvasCtx.value?.moveTo(startPosition.x, startPosition.y);
    paintingCanvasCtx.value?.lineTo(newPosition.x, newPosition.y);
    paintingCanvasCtx.value?.stroke();
    paintingCanvasCtx.value?.closePath();

    isStartSet = false;
  };

  return {
    lineStartDrawing,
    lineEndDrawing,
    lineDrawPreview,
  };
}
