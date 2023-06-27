import { Burger, TabsNav, type TabsNavProps } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import { startCase } from 'lodash-es';
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

const Nav = memo(() => {
  const { mobile } = useResponsive();
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState<TabsNavProps['items']>([]);

  useEffect(() => {
    hideOriganlNav();
    const buttons = getNavButtons();
    const list: TabsNavProps['items'] = buttons.map((button: HTMLButtonElement, index: number) => {
      button.id = `kitchen-nav-${index}`;
      return {
        key: String(index),
        label: (
          <div
            onClick={() => {
              const buttons = getNavButtons();
              buttons[index]?.click();
            }}
          >
            {startCase(String(button.textContent))}
          </div>
        ),
      };
    });
    setItems(list.filter(Boolean));
  }, []);

  if (mobile) return <Burger items={items} opened={opened} setOpened={setOpened} />;

  return <TabsNav items={items} />;
});

export default Nav;
