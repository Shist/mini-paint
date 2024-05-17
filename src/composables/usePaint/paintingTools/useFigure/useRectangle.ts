import { DrawFigureFunction } from "@/composables/usePaint/paintingTools/useFigure";

export default function useRectangle() {
  const drawRectangle: DrawFigureFunction = (
    ctx,
    startPosition,
    newPosition
  ) => {
    const rectangleWidth = newPosition.x - startPosition.x;
    const rectangleHeight = newPosition.y - startPosition.y;

    ctx.value?.beginPath();
    ctx.value?.rect(
      startPosition.x,
      startPosition.y,
      rectangleWidth,
      rectangleHeight
    );
    ctx.value?.stroke();
    ctx.value?.fill();
    ctx.value?.closePath();
  };

  return { drawRectangle };
}
