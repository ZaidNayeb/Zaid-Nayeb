// Holds the single Lenis instance so any component can stop/start or scroll it.
let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};

export const getLenis = () => instance;

export const scrollToTop = (immediate = true) => {
  if (instance) instance.scrollTo(0, { immediate, force: true });
  else window.scrollTo(0, 0);
};
