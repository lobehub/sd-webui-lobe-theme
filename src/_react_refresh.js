import { consola } from 'consola';

import RefreshRuntime from '/@react-refresh';

const RefreshSig = (type) => type;

RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => RefreshSig;
window.__vite_plugin_react_preamble_installed__ = true;

consola.success('🤯 Injecting React Refresh');
