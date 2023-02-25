class FaviconHandler {
    static setFavicon() {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = getComputedStyle(gradioApp().querySelector('.icon-container')).backgroundImage.replace(/^url\("|"\)$/g, '');
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    static observeGradioApp() {
        const observer = new MutationObserver(() => {
            const iconContainer = gradioApp().querySelector('.icon-container');
            if (iconContainer) {
                observer.disconnect();
                FaviconHandler.setFavicon();
            }
        });
        observer.observe(gradioApp(), { childList: true, subtree: true });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    FaviconHandler.observeGradioApp();
});
