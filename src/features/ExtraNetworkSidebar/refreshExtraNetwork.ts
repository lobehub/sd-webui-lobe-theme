export const refreshExtraNetwork = (type: 'txt' | 'img') => {
  const extraNetworkButton = document.querySelectorAll(
    `#${type}2img_extra_tabs > .tab-nav > button`,
  )[1] as HTMLButtonElement;
  extraNetworkButton?.click();
};
