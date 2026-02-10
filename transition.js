(() => {
  const DURATION_MS = 360;

  function isInternalNavigation(link) {
    if (!link || !link.href) return false;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return false;
    return true;
  }

  window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("page-ready");

    document.querySelectorAll("a[href]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.defaultPrevented) return;
        if (event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!isInternalNavigation(link)) return;

        event.preventDefault();
        document.body.classList.remove("page-ready");
        document.body.classList.add("page-exit");
        window.setTimeout(() => {
          window.location.href = link.href;
        }, DURATION_MS);
      });
    });
  });
})();
