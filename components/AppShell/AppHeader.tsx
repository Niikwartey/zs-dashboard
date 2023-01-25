import React from 'react';
import Link from 'next/link';
import {
  Burger,
  Header,
  MediaQuery,
  Text,
  Group,
  useMantineTheme,
} from '@mantine/core';

interface AppHeaderProps {
  burgerOpened: boolean;
  toggelBurgerOpened: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  burgerOpened,
  toggelBurgerOpened,
}) => {
  const theme = useMantineTheme();

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Group position="apart" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={burgerOpened}
                onClick={() => toggelBurgerOpened()}
                size="sm"
                color={theme.colors.gray[6]}
                mr="lg"
              />
            </MediaQuery>

            <Text component={Link} href="/" size={20} weight={700}>
              ZipSec
            </Text>
          </div>
        </Group>
      </div>
    </Header>
  );
};

export default AppHeader;
