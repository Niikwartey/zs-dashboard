import { TJamfInventoryInfo } from '@/data/schemas';
import { TJamfInventoryStats } from '@/types';

export function calcPercentage(
  value: number,
  total: number,
  decimalPlaces: number = 2
): number {
  return Number(((value / total) * 100).toFixed(decimalPlaces));
}

export function calcInventoryStats(
  inventoryInfo: TJamfInventoryInfo
): TJamfInventoryStats {
  const totalComputers =
    inventoryInfo.managedComputers + inventoryInfo.unmanagedComputers + 10;
  const totalMobileDevices =
    inventoryInfo.managedDevices + inventoryInfo.unmanagedDevices;
  const totalDevices = totalComputers + totalMobileDevices;
  const totalManagedDevices =
    inventoryInfo.managedComputers + inventoryInfo.managedDevices;
  const totalUnmanagedDevices =
    inventoryInfo.unmanagedComputers + inventoryInfo.unmanagedDevices + 10;

  return {
    totalDevices,
    totalComputers,
    totalMobileDevices,
    totalManagedDevices,
    totalUnmanagedDevices,
    managedPercentage: calcPercentage(totalManagedDevices, totalDevices),
    unmanagedPercentage: calcPercentage(totalUnmanagedDevices, totalDevices),
  };
}
