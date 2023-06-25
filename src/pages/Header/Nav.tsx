import { TabsNav, type TabsNavProps } from '@lobehub/ui';
import { memo, useEffect, useState } from 'react';

const hideOriganlNav = () => {
  (gradioApp().querySelector('#tabs > .tab-nav:first-of-type') as HTMLDivElement).style.display =
    'none';
};

const getNavButtons = (): HTMLButtonElement[] =>
  Array.prototype.slice.call(
    gradioApp().querySelectorAll(
      '#tabs > .tab-nav:first-of-type button',
    ) as NodeListOf<HTMLButtonElement>,
  );

const onChange: TabsNavProps['onChange'] = (activeKey) => {
  const buttons = getNavButtons();
  buttons[Number(activeKey)]?.click();
};

const Nav = memo(() => {
  const [items, setItems] = useState<TabsNavProps['items']>([]);

  useEffect(() => {
    hideOriganlNav();
    const buttons = getNavButtons();
    const list: TabsNavProps['items'] = buttons.map(
      (button: HTMLButtonElement | any, index: number) => {
        button.id = `kitchen-nav-${index}`;
        return {
          key: String(index),
          label: button.textContent,
        };
      },
    );
    setItems(list.filter(Boolean));
  }, []);

  return <TabsNav items={items} onChange={onChange} />;
});

export default Nav;
