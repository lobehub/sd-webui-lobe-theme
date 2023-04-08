/**
 * 处理网站的 favicon 图标
 */
class FaviconHandler {
  /**
   * 设置网站的 favicon 图标
   */
  static setFavicon(): void {
    const link: HTMLLinkElement = document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = 'https://gw.alipayobjects.com/zos/bmw-prod/51a51720-8a30-4430-b6c9-be5712364f04.svg'
    document.getElementsByTagName('head')[0].appendChild(link)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  FaviconHandler.setFavicon()
})
