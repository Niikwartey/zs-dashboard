import React, { useCallback, useState } from 'react';
import {
  IconSettings,
  IconServerCog,
  IconHistory,
  IconChartHistogram,
} from '@tabler/icons';
import {
  Navbar,
  Group,
  Text,
  UnstyledButton,
  Center,
  Anchor,
  useMantineTheme,
  Divider,
} from '@mantine/core';
import { useRouter } from 'next/router';

interface AppNavLinkProps {
  active: boolean;
  href: string;
  color: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const AppNavLink: React.FC<AppNavLinkProps> = ({
  href,
  icon,
  label,
  onClick,
}) => {
  const router = useRouter();
  return (
    <UnstyledButton
      onClick={() => {
        onClick?.();
        router.push(href);
        console.log('clicked');
      }}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group spacing="xs">
        {icon}
        <Text size="sm" variant="text">
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

interface AppNavProps {
  hidden: boolean;
}

const AppNav: React.FC<AppNavProps> = ({ hidden }) => {
  const theme = useMantineTheme();
  const [activeNavLink, setActiveNavLink] = useState<string | null>(null);

  const setNavActive = useCallback(
    (label: string) => () => setActiveNavLink(label),
    []
  );

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={hidden}
      width={{ sm: 200, lg: 300 }}
    >
      <Navbar.Section grow mt="md">
        <nav>
          <AppNavLink
            color={theme.colors.dark[1]}
            icon={<IconChartHistogram />}
            label="Dashboard"
            href="/dashboard"
            onClick={setNavActive('dashboard')}
            active={activeNavLink === 'dashboard'}
          />
          <AppNavLink
            color={theme.colors.dark[1]}
            icon={<IconHistory />}
            label="History"
            href="#"
            onClick={setNavActive('users')}
            active={activeNavLink === 'users'}
          />
        </nav>
      </Navbar.Section>

      <Navbar.Section>
        <nav>
          <AppNavLink
            color={theme.colors.dark[1]}
            icon={<IconSettings />}
            label="Settings"
            href="#"
            onClick={setNavActive('settings')}
            active={activeNavLink === 'settings'}
          />
          {1 === 1 && ( // TODO: Permission-gate admin panel nav link
            <AppNavLink
              color={theme.colors.dark[1]}
              icon={<IconServerCog />}
              label="Admin Panel"
              href="#"
              onClick={setNavActive('admin')}
              active={activeNavLink === 'admin'}
            />
          )}
        </nav>
      </Navbar.Section>

      <Divider my="sm" color="gray.2" />

      <Navbar.Section>
        <Center>
          <Text size="sm" color="dark.2">
            @2022{' '}
            <Anchor href="#" target="_blank" rel="noopener noreferrer">
              <Text component="span" color="dark.2">
                Zip Security
              </Text>
            </Anchor>
          </Text>
        </Center>
      </Navbar.Section>
    </Navbar>
  );
};

export default AppNav;
