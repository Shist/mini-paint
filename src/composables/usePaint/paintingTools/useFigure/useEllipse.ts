import { DrawFigureFunction } from "@/composables/usePaint/paintingTools/useFigure";

export default function useEllipse() {
  const drawEllipse: DrawFigureFunction = (ctx, startPosition, newPosition) => {
    const radiusX = Math.abs((newPosition.x - startPosition.x) / 2);
    const radiusY = Math.abs((newPosition.y - startPosition.y) / 2);

    ctx.value?.beginPath();
    ctx.value?.ellipse(
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
    ctx.value?.stroke();
    ctx.value?.closePath();
  };

  return { drawEllipse };
}
