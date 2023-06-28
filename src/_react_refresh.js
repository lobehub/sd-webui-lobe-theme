import RefreshRuntime from '/@react-refresh';

const RefreshSig = (type) => type;

RefreshRuntime.injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => RefreshSig;
window.__vite_plugin_react_preamble_installed__ = true;

console.log('🚧 Injecting React Refresh');
