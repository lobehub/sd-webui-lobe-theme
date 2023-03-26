class FaviconHandler {
  static setFavicon() {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href =
      'https://gw.alipayobjects.com/zos/bmw-prod/51a51720-8a30-4430-b6c9-be5712364f04.svg';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  FaviconHandler.setFavicon();
});
