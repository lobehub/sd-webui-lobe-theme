import {TabsNav, type TabsNavProps} from '@lobehub/ui';
import {memo, useEffect, useState} from 'react';

const getNavButtons: HTMLButtonElement[] | any = () =>
    gradioApp().querySelectorAll('#tabs > .tab-nav:first-child button') || [];

const onChange: TabsNavProps['onChange'] = (activeKey) => {
    const buttons = getNavButtons();
    buttons[Number(activeKey)]?.click();
};

const Nav = memo(() => {
    const [items, setItems] = useState<TabsNavProps['items']>([]);

    useEffect(() => {
        onUiLoaded(() => {
            const buttons = getNavButtons();
            const list: TabsNavProps['items'] | any = [];
            buttons.forEach((button: HTMLButtonElement | any, index: number) => {
                button.id = `kitchen-nav-${index}`;
                list.push({
                    key: String(index),
                    label: button.textContent,
                });
            });
            setItems(list.filter(Boolean));
        });
    }, []);

    return <TabsNav items={items} onChange={onChange} />;
});

export default Nav;
