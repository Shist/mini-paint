import { Ref } from "vue";
import usePosition from "@/composables/usePaint/usePosition";
import useClearPreview from "@/composables/usePaint/useClearPreview";

export default function useStar(
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

  const drawStar = (
    ctx: Ref<CanvasRenderingContext2D | null>,
    centerX: number,
    centerY: number,
    radiusX: number,
    radiusY: number
  ) => {
    if (!ctx.value) {
      return;
    }

    const angleStep = Math.PI / 5;
    let currAngle = -Math.PI / 10;
    let hypotenuseX = null;
    let hypotenuseY = null;
    let currX = null;
    let currY = null;

    ctx.value.beginPath();

    for (let point = 0; point < 10; point++) {
      hypotenuseX = point % 2 === 1 ? radiusX / 2 : radiusX;
      hypotenuseY = point % 2 === 1 ? radiusY / 2 : radiusY;

      currX = centerX + Math.cos(currAngle) * hypotenuseX;
      currY = centerY + Math.sin(currAngle) * hypotenuseY;

      currAngle += angleStep;

      ctx.value?.lineTo(currX, currY);
    }

    ctx.value.closePath();
    ctx.value.stroke();
  };

  const starStartDrawing = (e: MouseEvent | TouchEvent) => {
    startPosition = getPosition(e);
    isStartSet = true;
  };

  const starDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    const newPosition = getPosition(e);
    const radiusX = Math.abs((newPosition.x - startPosition.x) / 2);
    const radiusY = Math.abs((newPosition.y - startPosition.y) / 2);
    const centerX =
      newPosition.x > startPosition.x
        ? startPosition.x + radiusX
        : startPosition.x - radiusX;
    const centerY =
      newPosition.y > startPosition.y
        ? startPosition.y + radiusY
        : startPosition.y - radiusY;

    drawStar(previewCanvasCtx, centerX, centerY, radiusX, radiusY);
  };

  function starEndDrawing(e: MouseEvent | TouchEvent) {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    const newPosition = getPosition(e);
    const radiusX = Math.abs((newPosition.x - startPosition.x) / 2);
    const radiusY = Math.abs((newPosition.y - startPosition.y) / 2);
    const centerX =
      newPosition.x > startPosition.x
        ? startPosition.x + radiusX
        : startPosition.x - radiusX;
    const centerY =
      newPosition.y > startPosition.y
        ? startPosition.y + radiusY
        : startPosition.y - radiusY;

    drawStar(paintingCanvasCtx, centerX, centerY, radiusX, radiusY);

    isStartSet = false;
  }

  return {
    starStartDrawing,
    starDrawPreview,
    starEndDrawing,
  };
}
