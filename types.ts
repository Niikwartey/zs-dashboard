import type { Color, DeltaType } from '@tremor/react';

export type InAppNotification = {
  success: boolean;
  sucessMessage: string;
  errorMessage: string;
};

export type Notification = InAppNotification;

export interface ICategory {
  title: string;
  metric: string;
  subCategoryPercentageValues: number[];
  subCategroyColors: Color[];
  subCategoryTitles: string[];
}

export type TJamfInventoryStats = {
  totalDevices: number;
  totalComputers: number;
  totalMobileDevices: number;
  totalManagedDevices: number;
  totalUnmanagedDevices: number;
  managedPercentage: number;
  unmanagedPercentage: number;
};

export type IDeviceUser = {
  name: string;
  leads: number;
  sales: string;
  quota: string;
  variance: string;
  region: string;
  status: string;
  deltaType: DeltaType;
};
