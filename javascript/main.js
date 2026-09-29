/* Lobe Theme Redux loader */
(function () {
  if (window.__LOBE_THEME_ENTRY__) return;
  window.__LOBE_THEME_ENTRY__ = true;
  var script = document.currentScript;
  var base = (script && script.src) || location.href;
  import(new URL("chunks/main-Cm6JoajB.js", base).href).catch(function (error) {
    console.error('[Lobe Theme Redux] could not load', error);
  });
})();
