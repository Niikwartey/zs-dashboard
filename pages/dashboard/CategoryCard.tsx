import { Text } from '@mantine/core';
import { Card, CategoryBar, Legend, Metric } from '@tremor/react';
import '@tremor/react/dist/esm/tremor.css';
import { ICategory } from '@/types';

export function CategoryCard({ categoryProps }: { categoryProps: ICategory }) {
  return (
    <Card key={categoryProps.title}>
      <Text color="gray">{categoryProps.title}</Text>
      <Metric>{categoryProps.metric}</Metric>
      <CategoryBar
        categoryPercentageValues={categoryProps.subCategoryPercentageValues}
        colors={categoryProps.subCategroyColors}
        marginTop="mt-4"
      />
      <Legend
        categories={categoryProps.subCategoryTitles}
        colors={categoryProps.subCategroyColors}
        marginTop="mt-3"
      />
    </Card>
  );
}
