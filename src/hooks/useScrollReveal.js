import { useEffect } from "react";

const useScrollReveal = () => {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-animate]"));

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { target } = entry;
          const shouldRepeat = target.dataset.animateRepeat !== "false";

          if (entry.isIntersecting) {
            target.classList.add("animate-in-view");
          } else if (shouldRepeat) {
            target.classList.remove("animate-in-view");
          } else {
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    elements.forEach((el) => {
      if (el.dataset.animateDelay) {
        el.style.setProperty("--animate-delay", el.dataset.animateDelay);
      }
      if (el.dataset.animateDuration) {
        el.style.setProperty("--animate-duration", el.dataset.animateDuration);
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

export default useScrollReveal;
