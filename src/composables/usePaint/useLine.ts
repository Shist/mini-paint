import { Ref } from "vue";
import usePosition from "@/composables/usePaint/usePosition";

export default function useLine(
  paintingCanvas: Ref<HTMLCanvasElement | null>,
  paintingCanvasCtx: Ref<CanvasRenderingContext2D | null>,
  previewCanvas: Ref<HTMLCanvasElement | null>,
  previewCanvasCtx: Ref<CanvasRenderingContext2D | null>
) {
  const { getPosition } = usePosition(paintingCanvas);

  let startPosition = { x: 0, y: 0 };
  let isStartSet = false;

  const lineStartDrawing = (e: MouseEvent | TouchEvent) => {
    startPosition = getPosition(e);
    isStartSet = true;
  };

  const lineDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (isStartSet && paintingCanvasCtx) {
      const newPosition = getPosition(e);
      previewCanvasCtx.value?.clearRect(
        0,
        0,
        previewCanvas.value ? previewCanvas.value?.width : 0,
        previewCanvas.value ? previewCanvas.value?.height : 0
      );
      previewCanvasCtx.value?.beginPath();
      previewCanvasCtx.value?.moveTo(startPosition.x, startPosition.y);
      previewCanvasCtx.value?.lineTo(newPosition.x, newPosition.y);
      previewCanvasCtx.value?.stroke();
      previewCanvasCtx.value?.closePath();
    }
  };

  function lineEndDrawing(e: MouseEvent | TouchEvent) {
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
    paintingCanvasCtx.value?.beginPath();
    paintingCanvasCtx.value?.moveTo(startPosition.x, startPosition.y);
    paintingCanvasCtx.value?.lineTo(newPosition.x, newPosition.y);
    paintingCanvasCtx.value?.stroke();
    paintingCanvasCtx.value?.closePath();
  }

  return {
    lineStartDrawing,
    lineEndDrawing,
    lineDrawPreview,
  };
}
