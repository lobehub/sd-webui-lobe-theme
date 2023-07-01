// scripts.js

declare const gradioApp: () => DocumentFragment;
declare const get_uiCurrentTab: () => HTMLElement;
declare const get_uiCurrentTabContent: () => HTMLElement;
declare const uiUpdateCallbacks: ((m: unknown) => void)[];
declare const uiLoadedCallbacks: ((m: unknown) => void)[];
declare const uiTabChangeCallbacks: ((m: unknown) => void)[];
declare const optionsChangedCallbacks: ((m: unknown) => void)[];
declare let uiCurrentTab: Element | null;
declare const onUiUpdate: (callback: (m: unknown) => void) => void;
declare const onUiLoaded: (callback: (m: unknown) => void) => void;
declare const onUiTabChange: (callback: (m: unknown) => void) => void;
declare const onOptionsChanged: (callback: (m: unknown) => void) => void;
declare const addAutocompleteToArea: (reference: any) => void;
declare const lobeSetPrompt: (prompt: string) => void;
