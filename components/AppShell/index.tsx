import React, { useState } from 'react';
import { AppShell as MantineShell, Box, useMantineTheme } from '@mantine/core';
import AppHeader from '@/components/AppShell/AppHeader';
import AppNav from '@/components/AppShell/AppNav';

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <MantineShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      header={
        <AppHeader
          burgerOpened={opened}
          toggelBurgerOpened={() => setOpened((o) => !o)}
        />
      }
      navbar={<AppNav hidden={!opened} />}
    >
      <Box component="main" p="xl">
        {children}
      </Box>
    </MantineShell>
  );
};

export default AppShell;
