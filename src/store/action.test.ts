// import { act, renderHook } from '@testing-library/react';
// import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
//
// import * as api from './api';
// import { useAppStore } from './index';
//
// vi.mock('./api', () => ({
//   getLatestVersion: vi.fn(),
//   getLocaleOptions: vi.fn(),
//   getSetting: vi.fn(),
//   getVersion: vi.fn(),
//   postSetting: vi.fn(),
// }));
//
// // Mock for localStorage
// const localStorageMock = (function () {
//   let store: any = {};
//   return {
//     clear: () => {
//       store = {};
//     },
//     getItem: vi.fn((key) => store[key] || null),
//     setItem: vi.fn((key, value) => {
//       store[key] = value.toString();
//     }),
//   };
// })();
//
// (global as any).localStorage = localStorageMock;
//
// beforeAll(() => {
//   // Initialize mocks before all tests
//   vi.mocked(api.getSetting).mockResolvedValue(undefined);
//   vi.mocked(api.postSetting).mockResolvedValue(undefined);
//   vi.mocked(api.getVersion).mockResolvedValue('1.0.0');
//   vi.mocked(api.getLatestVersion).mockResolvedValue('1.0.1');
//   vi.mocked(api.getLocaleOptions).mockResolvedValue([]);
// });
//
// afterEach(() => {
//   // Clear all mocks after each test
//   vi.clearAllMocks();
//   localStorage.clear();
// });
//
// describe('Store Actions', () => {
//   it('onInit should initialize the store correctly', async () => {
//     const { result } = renderHook(() => useAppStore());
//
//     act(() => {
//       result.current.onInit();
//     });
//
//     expect(result.current.loading).toBe(false);
//     expect(result.current.version).toBe('1.0.0');
//     expect(result.current.latestVersion).toBe('1.0.1');
//     expect(result.current.localeOptions).toEqual([]);
//   });
//
//   it('onLoadSetting should load settings correctly', async () => {
//     const { result } = renderHook(() => useAppStore());
//
//     const mockSetting = {
//       confirmPageUnload: true,
//       enableSidebar: false,
//     };
//
//     // Simulate local storage having a setting
//     localStorage.setItem('SD-LOBE-SETTING', JSON.stringify(mockSetting));
//
//     act(() => {
//       result.current.onLoadSetting();
//     });
//
//     expect(result.current.setting).toEqual(expect.objectContaining(mockSetting));
//   });
//
//   it('onSetSetting should update the setting correctly', async () => {
//     const { result } = renderHook(() => useAppStore());
//
//     const newSetting = {
//       confirmPageUnload: false,
//     };
//
//     await act(async () => {
//       await result.current.onSetSetting(newSetting);
//     });
//
//     expect(localStorage.setItem).toHaveBeenCalledWith(
//       'SD-LOBE-SETTING',
//       JSON.stringify(expect.objectContaining(newSetting)),
//     );
//     expect(result.current.setting).toEqual(expect.objectContaining(newSetting));
//     expect(api.postSetting).toHaveBeenCalledWith(expect.objectContaining(newSetting));
//   });
//
//   // Add more tests for each action as required...
// });
