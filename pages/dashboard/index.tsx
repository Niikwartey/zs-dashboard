import { Card, ColGrid, Block } from '@tremor/react';
import '@tremor/react/dist/esm/tremor.css';
import { ICategory } from '@/types';
import {
  apiKey,
  getJamfMacOsUpdates,
  getComputerInventory,
  getJamfApiToken,
  getJamfInventoryInfo,
} from '@/data/requests';
import {
  IJamfMacOSUpdates,
  IJamfComputer,
  IJamfComputerInventory,
  makeFakeJamfComputer,
  TJamfInventoryInfo,
} from '@/data/schemas';
import { calcInventoryStats } from '@/utils';
import CategoryCard from '@/components/CategoryCard';
import DevicesTable from '@/components/DevicesTable';

function inventoryCategories(inventoryInfo: TJamfInventoryInfo): ICategory[] {
  if (!inventoryInfo) return [];

  const inventoryStats = calcInventoryStats(inventoryInfo);
  return [
    {
      title: 'Total devices',
      metric: inventoryStats?.totalDevices?.toString(),
      subCategoryPercentageValues: [
        inventoryStats?.managedPercentage,
        inventoryStats.unmanagedPercentage,
      ],
      subCategroyColors: ['green', 'red'],
      subCategoryTitles: [
        `Managed (${inventoryStats.totalManagedDevices})`,
        `Not managed (${inventoryStats.totalUnmanagedDevices})`,
      ],
    },
    // TODO: Add proper metrics for security
    {
      title: 'Secured devices',
      metric: '54%',
      subCategoryPercentageValues: [54, 37, 9],
      subCategroyColors: ['green', 'yellow', 'rose'],
      subCategoryTitles: ['Fully secured', 'Partially Secured', 'Not Secured'],
    },
    // TODO: Add proper metrics for operating systems
    {
      title: 'Operating Systems',
      metric: '4',
      subCategoryPercentageValues: [73, 16, 7, 4],
      subCategroyColors: ['indigo', 'slate', 'teal', 'amber'],
      subCategoryTitles: ['MacOS', 'iOS', 'Windows', 'Linux'],
    },
  ];
}

interface IDevicesPageProps {
  inventoryInfo: TJamfInventoryInfo;
  computers: IJamfComputer[];
  macOSUpdates: IJamfMacOSUpdates;
}

export default function DashboardPage({
  inventoryInfo,
  computers,
  macOSUpdates,
}: IDevicesPageProps) {
  return (
    <>
      <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
        {inventoryCategories(inventoryInfo).map((categoryProps, index) => (
          <CategoryCard categoryProps={categoryProps} key={index} />
        ))}
      </ColGrid>

      <Block marginTop="mt-10">
        <Card>
          <DevicesTable computers={computers} macOSUpdates={macOSUpdates} />
        </Card>
      </Block>
    </>
  );
}

export async function getServerSideProps() {
  if (!apiKey) {
    try {
      await getJamfApiToken();
    } catch (error) {
      console.error(error);
    }
  }

  const asyncPropValues = await Promise.allSettled([
    getJamfInventoryInfo(),
    getJamfMacOsUpdates(),
    getComputerInventory(),
  ]);

  const [inventoryInfo, macOSUpdates, computersRes] = asyncPropValues.map(
    (res) => {
      if (res.status === 'fulfilled' && res.value) {
        return res.value;
      }
      return null;
    }
  ) as [
    TJamfInventoryInfo | null,
    IJamfMacOSUpdates | null,
    IJamfComputerInventory | null
  ];

  // TODO: Remove this once we have more real data
  const seededComputers: IJamfComputer[] = [
    ...(computersRes?.results || []),
    makeFakeJamfComputer({ id: '1234' }),
    makeFakeJamfComputer({ id: '1235' }),
    makeFakeJamfComputer({ id: '1236' }),
    makeFakeJamfComputer({ id: '1237' }),
    makeFakeJamfComputer({ id: '1238' }),
  ];

  return {
    props: {
      inventoryInfo,
      macOSUpdates,
      computers: seededComputers,
    },
  };
}
