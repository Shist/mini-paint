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

  const drawLine = (
    e: MouseEvent | TouchEvent,
    ctx: Ref<CanvasRenderingContext2D | null>
  ) => {
    const newPosition = getPosition(e);

    ctx.value?.beginPath();
    ctx.value?.moveTo(startPosition.x, startPosition.y);
    ctx.value?.lineTo(newPosition.x, newPosition.y);
    ctx.value?.stroke();
    ctx.value?.closePath();
  };

  const lineStartDrawing = (e: MouseEvent | TouchEvent) => {
    startPosition = getPosition(e);
    isStartSet = true;
  };

  const lineDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    drawLine(e, previewCanvasCtx);
  };

  const lineEndDrawing = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    drawLine(e, paintingCanvasCtx);

    isStartSet = false;
  };

  return {
    lineStartDrawing,
    lineEndDrawing,
    lineDrawPreview,
  };
}
