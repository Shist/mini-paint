import { Ref } from "vue";
import usePosition from "@/composables/usePaint/usePosition";
import useClearPreview from "@/composables/usePaint/useClearPreview";

export type DrawFigureFunction = (
  ctx: Ref<CanvasRenderingContext2D | null>,
  startPosition: { x: number; y: number },
  newPosition: { x: number; y: number }
) => void;

export default function useFigure(
  paintingCanvas: Ref<HTMLCanvasElement | null>,
  paintingCanvasCtx: Ref<CanvasRenderingContext2D | null>,
  previewCanvas: Ref<HTMLCanvasElement | null>,
  previewCanvasCtx: Ref<CanvasRenderingContext2D | null>,
  drawFigure: DrawFigureFunction
) {
  const { getPosition } = usePosition(paintingCanvas);
  const { clearPreviewCanvas } = useClearPreview(
    previewCanvas,
    previewCanvasCtx
  );

  let startPosition = { x: 0, y: 0 };
  let isStartSet = false;

  const figureStartDrawing = (e: MouseEvent | TouchEvent) => {
    startPosition = getPosition(e);
    isStartSet = true;
  };

  const figureDrawPreview = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    drawFigure(previewCanvasCtx, startPosition, getPosition(e));
  };

  const figureEndDrawing = (e: MouseEvent | TouchEvent) => {
    if (!isStartSet) {
      return;
    }

    clearPreviewCanvas();

    drawFigure(paintingCanvasCtx, startPosition, getPosition(e));

    isStartSet = false;
  };

  return {
    figureStartDrawing,
    figureEndDrawing,
    figureDrawPreview,
  };
}
