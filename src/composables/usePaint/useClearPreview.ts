import { Ref } from "vue";

export default function useClearPreview(
  previewCanvas: Ref<HTMLCanvasElement | null>,
  previewCanvasCtx: Ref<CanvasRenderingContext2D | null>
) {
  const clearPreviewCanvas = () => {
    previewCanvasCtx.value?.clearRect(
      0,
      0,
      previewCanvas.value ? previewCanvas.value?.width : 0,
      previewCanvas.value ? previewCanvas.value?.height : 0
    );
  };

  return { clearPreviewCanvas };
}
