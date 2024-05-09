import { DrawFigureFunction } from "@/composables/usePaint/paintingTools/useFigure";

export default function useLine() {
  const drawLine: DrawFigureFunction = (ctx, startPosition, newPosition) => {
    ctx.value?.beginPath();
    ctx.value?.moveTo(startPosition.x, startPosition.y);
    ctx.value?.lineTo(newPosition.x, newPosition.y);
    ctx.value?.stroke();
    ctx.value?.closePath();
  };

  return { drawLine };
}
