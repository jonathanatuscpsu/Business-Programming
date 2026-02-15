(function () {
  const storageKey = "color-mode";
  const root = document.documentElement;

  function prefersDark() {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function apply(mode) {
    if (mode === "dark") root.setAttribute("data-theme", "dark");
    else if (mode === "light") root.setAttribute("data-theme", "light");
    else root.setAttribute("data-theme", prefersDark() ? "dark" : "light"); // auto
  }

  function getDefault() {
    return (window.__COLOR_MODE_DEFAULT__ || "auto").toLowerCase();
  }

  function getMode() {
    return (localStorage.getItem(storageKey) || getDefault()).toLowerCase();
  }

  function setMode(mode) {
    localStorage.setItem(storageKey, mode);
    apply(mode);
  }

  // Initialize
  apply(getMode());

  // Expose API for the toggle button
  window.__colorMode = { getMode, setMode };

  // Update when OS theme changes (only when in auto)
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        if (getMode() === "auto") apply("auto");
      });
  }
})();
