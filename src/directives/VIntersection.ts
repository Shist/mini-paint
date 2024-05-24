import { DirectiveBinding } from "vue";

export default {
  mounted(elem: HTMLElement, binding: DirectiveBinding) {
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        if (typeof binding.value === "function") {
          binding.value();
        } else {
          console.error(
            "v-intersection directive expects a function as its value."
          );
        }
      }
    };

    const options = {
      rottMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(elem);
  },
  name: "intersection",
};
