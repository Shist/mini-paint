import { DrawFigureFunction } from "@/composables/usePaint/paintingTools/useFigure";

export default function useStar() {
  const drawStar: DrawFigureFunction = (ctx, startPosition, newPosition) => {
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

    const angleStep = Math.PI / 5;
    let currAngle = -Math.PI / 10;
    let hypotenuseX = null;
    let hypotenuseY = null;
    let currX = null;
    let currY = null;

    ctx.value?.beginPath();

    for (let point = 0; point < 10; point++) {
      hypotenuseX = point % 2 === 1 ? radiusX / 2 : radiusX;
      hypotenuseY = point % 2 === 1 ? radiusY / 2 : radiusY;

      currX = centerX + Math.cos(currAngle) * hypotenuseX;
      currY = centerY + Math.sin(currAngle) * hypotenuseY;

      currAngle += angleStep;

      ctx.value?.lineTo(currX, currY);
    }

    ctx.value?.closePath();
    ctx.value?.stroke();
    ctx.value?.fill();
  };

  return { drawStar };
}
