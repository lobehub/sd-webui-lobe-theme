import React, { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import styled from 'styled-components'

const NavBar = styled(Menu)`
  flex: 1;
  border: none;
  line-height: 1;
  
	.ant-menu-overflow-item {
		padding: 8px 12px;
		border-radius: 4px !important;
		color: var(--color-text-secondary);
		&:after {
			display: none; !important;
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
`

const Nav: React.FC = () => {
  const [items, setItems] = useState<MenuProps['items']>([])

  useEffect(() => {
    onUiLoaded(() => {
      const buttons = gradioApp().querySelectorAll('#tabs > .tab-nav:first-child button')
      const list: MenuProps['items'] | any = []
      buttons.forEach((button: HTMLButtonElement | any, index) => {
        button.id = `kitchen-nav-${index}`
        list.push({
          label: button.textContent,
          key: String(index),
        })
      })
      setItems(list)
    })
  }, [])

  const onClick: MenuProps['onClick'] = (e: any) => {
    const buttons: HTMLButtonElement[] | any = gradioApp().querySelectorAll('#tabs > .tab-nav:first-child button')
    buttons[Number(e.key)]?.click()
  }

  return <NavBar defaultActiveFirst defaultSelectedKeys={['0']} onClick={onClick} mode="horizontal" items={items} />
}

export default Nav
