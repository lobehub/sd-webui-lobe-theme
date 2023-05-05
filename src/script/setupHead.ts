export default () => {
  // favicon
  const favicon: HTMLLinkElement = document.createElement('link')
  favicon.rel = 'icon'
  favicon.type = 'image/svg+xml'
  favicon.href = 'https://gw.alipayobjects.com/zos/bmw-prod/51a51720-8a30-4430-b6c9-be5712364f04.svg'
  document.getElementsByTagName('head')[0].appendChild(favicon)
}
