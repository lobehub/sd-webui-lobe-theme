import { Burger, TabsNav, type TabsNavProps } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import { startCase } from 'lodash-es';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';

import { selectors, useAppStore } from '@/store';

const hideOriganlNav = () => {
  (gradioApp().querySelector('#tabs > .tab-nav:first-of-type') as HTMLDivElement).style.display =
    'none';
};

const getNavTabs = (): HTMLDivElement[] =>
  Array.prototype.slice.call(
    gradioApp().querySelectorAll('#tabs > [id^="tab_"]') as NodeListOf<HTMLDivElement>,
  );
const getNavButtons = (): HTMLButtonElement[] =>
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
const genNavList = (): NavItem[] => {
  console.debug('🤯 [nav] generate nav list');
  const navList = getNavTabs();
  const buttons = getNavButtons();
  return buttons.map((button, index) => {
    const id = navList[index].id;
    return {
      id,
      index,
      label: startCase(String(button.textContent)),
    };
  });
};

const Nav = memo(() => {
  const currentTab = useAppStore(selectors.currentTab, shallow);
  const { mobile } = useResponsive();
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState<TabsNavProps['items']>([]);

  const navList = useMemo(() => genNavList(), []);

  const onChange: TabsNavProps['onChange'] = useCallback(
    (id: string) => {
      console.debug('🤯 [nav] onClick', id);
      const index = navList.find((nav) => nav.id === id)?.index || 0;
      const buttonList = getNavButtons();
      buttonList[index].click();
    },
    [navList],
  );

  useEffect(() => {
    console.time('🤯 [layout] inject - Header');
    hideOriganlNav();
    const list: TabsNavProps['items'] = navList.map((item) => {
      return {
        key: item.id,
        label: mobile ? <div onClick={() => onChange(item.id)}>{item.label}</div> : item.label,
      };
    });
    setItems(list.filter(Boolean));
    console.timeEnd('🤯 [layout] inject - Header');
  }, [mobile]);

  if (mobile) return <Burger items={items} opened={opened} setOpened={setOpened} />;

  return <TabsNav activeKey={currentTab} items={items} onChange={onChange} />;
});

export default Nav;
