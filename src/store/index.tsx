import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const SETTING_KEY = 'SD-KITCHEN-SETTING'

export interface WebuiSetting {
  promotTextarea: 'scroll' | 'resizable'
  sidebarExpand: boolean
  sidebarFixedMode: 'fixed' | 'float'
  sidebarWidth: number
  enableExtraNetworkSidebar: boolean
  extraNetworkSidebarExpand: boolean
  extraNetworkFixedMode: 'fixed' | 'float'
  extraNetworkSidebarWidth: number
  extraNetworkCardSize: number
  svgIcon: boolean
}

export const defaultSetting: WebuiSetting = {
  promotTextarea: 'scroll',
  sidebarExpand: true,
  sidebarFixedMode: 'fixed',
  sidebarWidth: 280,
  enableExtraNetworkSidebar: true,
  extraNetworkSidebarExpand: true,
  extraNetworkFixedMode: 'fixed',
  extraNetworkSidebarWidth: 340,
  extraNetworkCardSize: 86,
  svgIcon: false,
}
export interface AppState {
  themeMode: 'light' | 'dark'
  setting: WebuiSetting
  currentTab: string
  setCurrentTab: () => void
  onSetThemeMode: (themeMode: 'light' | 'dark') => void
  onLoadSetting: () => void
  onSetSetting: (setting: WebuiSetting) => void
  onInit: () => void
}
export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    themeMode: 'light',
    setting: defaultSetting,
    currentTab: 'tab_txt2img',
    setCurrentTab: () => {
      const currentTab = get_uiCurrentTabContent().id
      if (currentTab !== get().currentTab) set({ currentTab }, false, 'setCurrentTab')
    },
    onSetThemeMode: (themeMode) => {
      set(() => ({ themeMode }), false, 'onSetThemeMode')
    },
    onLoadSetting: () => {
      let setting: any = localStorage.getItem(SETTING_KEY)
      if (setting) {
        setting = JSON.parse(setting)
      } else {
        setting = defaultSetting
        localStorage.setItem(SETTING_KEY, JSON.stringify(defaultSetting))
      }
      set(() => ({ setting: { ...defaultSetting, ...setting } }), false, 'onLoadSetting')
    },
    onSetSetting: (setting) => {
      localStorage.setItem(SETTING_KEY, JSON.stringify(setting))
      set(() => ({ setting }), false, 'onSetSetting')
    },
    onInit: () => {
      get().onLoadSetting()
    },
  }))
)
