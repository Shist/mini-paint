import { Ref } from "vue";
import usePosition from "@/composables/usePaint/usePosition";

export default function useEllipse(
  paintingCanvas: Ref<HTMLCanvasElement | null>,
  paintingCanvasCtx: Ref<CanvasRenderingContext2D | null>,
  previewCanvas: Ref<HTMLCanvasElement | null>,
  previewCanvasCtx: Ref<CanvasRenderingContext2D | null>
) {
  const { getPosition } = usePosition(paintingCanvas);

  let startPosition = { x: 0, y: 0 };
  let isStartSet = false;

  const ellipseStartDrawing = (e: MouseEvent | TouchEvent) => {
    startPosition = getPosition(e);
    isStartSet = true;
  };

  const ellipseDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    previewCanvasCtx.value?.clearRect(
      0,
      0,
      previewCanvas.value ? previewCanvas.value?.width : 0,
      previewCanvas.value ? previewCanvas.value?.height : 0
    );

    const newPosition = getPosition(e);
    const radiusX = Math.abs((newPosition.x - startPosition.x) / 2);
    const radiusY = Math.abs((newPosition.y - startPosition.y) / 2);

    previewCanvasCtx.value?.beginPath();
    previewCanvasCtx.value?.ellipse(
      newPosition.x > startPosition.x
        ? startPosition.x + radiusX
        : startPosition.x - radiusX,
      newPosition.y > startPosition.y
        ? startPosition.y + radiusY
        : startPosition.y - radiusY,
      radiusX,
      radiusY,
      0,
      0,
      2 * Math.PI
    );
    previewCanvasCtx.value?.stroke();
    previewCanvasCtx.value?.closePath();
  };

  function ellipseEndDrawing(e: MouseEvent | TouchEvent) {
    if (!isStartSet) {
      return;
    }

    previewCanvasCtx.value?.clearRect(
      0,
      0,
      previewCanvas.value ? previewCanvas.value?.width : 0,
      previewCanvas.value ? previewCanvas.value?.height : 0
    );

    const newPosition = getPosition(e);
    const radiusX = Math.abs((newPosition.x - startPosition.x) / 2);
    const radiusY = Math.abs((newPosition.y - startPosition.y) / 2);

    paintingCanvasCtx.value?.beginPath();
    paintingCanvasCtx.value?.ellipse(
      newPosition.x > startPosition.x
        ? startPosition.x + radiusX
        : startPosition.x - radiusX,
      newPosition.y > startPosition.y
        ? startPosition.y + radiusY
        : startPosition.y - radiusY,
      radiusX,
      radiusY,
      0,
      0,
      2 * Math.PI
    );
    paintingCanvasCtx.value?.stroke();
    paintingCanvasCtx.value?.closePath();

    isStartSet = false;
  }

  return {
    ellipseStartDrawing,
    ellipseDrawPreview,
    ellipseEndDrawing,
  };
}
