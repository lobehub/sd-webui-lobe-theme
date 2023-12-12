import { consola } from 'consola';
import { startCase } from 'lodash-es';

const getNavTabs = (): HTMLDivElement[] =>
  Array.prototype.slice.call(
    gradioApp().querySelectorAll('#tabs > [id^="tab_"]') as NodeListOf<HTMLDivElement>,
  );
export const getNavButtons = (): HTMLButtonElement[] =>
  Array.prototype.slice.call(
    gradioApp().querySelectorAll(
      '#tabs > .tab-nav:first-of-type button',
    ) as NodeListOf<HTMLButtonElement>,
  );

interface NavItem {
  id: string;
  index: number;
  label: string;
}
export const genNavList = (): NavItem[] => {
  const navList = getNavTabs();
  const buttons = getNavButtons();
  consola.debug('🤯 [nav] generate nav list');
  return buttons.map((button, index) => {
    const id = navList[index].id;
    return {
      id,
      index,
      label: startCase(String(button.textContent)),
    };
  });
};
