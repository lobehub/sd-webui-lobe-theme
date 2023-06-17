import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import {memo, useEffect, useState} from 'react';
import styled from 'styled-components';

/******************************************************
 *********************** Style *************************
 ******************************************************/

const NavBar = styled(Menu)`
  overflow: hidden;
  flex: 1;
  line-height: 1;
  border: none;

  .ant-menu-overflow-item {
    padding: 8px 12px;
    color: var(--color-text-secondary);
    border-radius: 4px !important;

    &::after {
      display: none !important;
    }

    &:hover {
      color: var(--color-text);
      background: var(--color-fill-tertiary);
    }

    &.ant-menu-item-selected {
      font-weight: 600;
      color: var(--color-text);
    }
  }
`;

/******************************************************
 ************************* Dom *************************
 ******************************************************/

const onClick: MenuProps['onClick'] = (e: any) => {
    const buttons: HTMLButtonElement[] | any = gradioApp().querySelectorAll(
        '#tabs > .tab-nav:first-child button',
    );
    buttons[Number(e.key)]?.click();
};

const Nav = memo(() => {
    const [items, setItems] = useState<MenuProps['items']>([]);

    useEffect(() => {
        onUiLoaded(() => {
            const buttons = gradioApp().querySelectorAll('#tabs > .tab-nav:first-child button');
            const list: MenuProps['items'] | any = [];
            buttons.forEach((button: HTMLButtonElement | any, index) => {
                button.id = `kitchen-nav-${index}`;
                list.push({
                    key: String(index),
                    label: button.textContent,
                });
            });
            setItems(list);
        });
    }, []);

    return (
        <NavBar
            defaultActiveFirst
            defaultSelectedKeys={['0']}
            items={items}
            mode="horizontal"
            onClick={onClick}
        />
    );
});

export default Nav;
