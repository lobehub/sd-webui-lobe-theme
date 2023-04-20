import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
export interface AppState {
  currentTab: string
  setCurrentTab: () => void
}
export const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    currentTab: 'tab_txt2img',
    setCurrentTab: () => {
      const currentTab = get_uiCurrentTabContent().id
      if (currentTab !== get().currentTab) set({ currentTab }, false, 'setCurrentTab')
    },
  }))
)
