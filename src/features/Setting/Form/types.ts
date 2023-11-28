import { ItemGroup } from '@lobehub/ui';

import { WebuiSettingKeys } from '@/store';

export type SettingItemGroup = ItemGroup & {
  children: {
    name?: WebuiSettingKeys | string;
  }[];
};
