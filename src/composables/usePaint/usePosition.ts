import { Ref } from "vue";

export default function usePosition(
  paintingCanvas: Ref<HTMLCanvasElement | null>
) {
  const getPosition = (e: MouseEvent | TouchEvent) => {
    if (!paintingCanvas.value) {
      return { x: 0, y: 0 };
    }

    const rect = paintingCanvas.value.getBoundingClientRect();
    const scaleX = paintingCanvas.value.width / rect.width;
    const scaleY = paintingCanvas.value.height / rect.height;

    if (e instanceof TouchEvent) {
      return {
        x: (e.changedTouches[0].clientX - rect.left) * scaleX,
        y: (e.changedTouches[0].clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  return { getPosition };
}
