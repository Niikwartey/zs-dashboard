import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  MultiSelectBox,
  MultiSelectBoxItem,
} from '@tremor/react';
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDevices2,
  IconMailForward,
  IconShieldCheck,
  IconToggleRight,
  IconUser,
  IconUserPlus,
} from '@tabler/icons';
import { useCallback, useMemo, useState } from 'react';
import {
  Group,
  Badge,
  Text,
  Tooltip,
  Stack,
  ActionIcon,
  Box,
} from '@mantine/core';
import type { IJamfMacOSUpdates, IJamfComputer } from '@/data/schemas';
import useNotification from '@/hooks/useNotification';

interface IDevicesTableProps {
  computers: IJamfComputer[];
  macOSUpdates: IJamfMacOSUpdates;
}

function TruncateText({
  text,
  textProps = {},
  maxWidth = '100%',
}: {
  text: string;
  textProps?: Record<string, any>;
  maxWidth?: string;
}) {
  return (
    <Tooltip
      label={text}
      color="dark.3"
      withArrow
      arrowSize={6}
      events={{ hover: true, focus: true, touch: false }}
    >
      <Box style={{ width: maxWidth }}>
        <Text {...textProps} truncate>
          {text}
        </Text>
      </Box>
    </Tooltip>
  );
}

export default function DevicesTable({
  computers,
  macOSUpdates,
}: IDevicesTableProps) {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const { notifyInApp } = useNotification();
  /* 
    Group computers based on users' realnames.
  */
  const computersByUser = useMemo(() => {
    const computersByUser = new Map<string, IJamfComputer[]>();
    computers.forEach((computer) => {
      const { realname } = computer.userAndLocation;
      if (computersByUser.has(realname)) {
        computersByUser.get(realname)?.push(computer);
      } else {
        computersByUser.set(realname, [computer]);
      }
    });
    return computersByUser;
  }, [computers]);

  /* 
    Filter devices based on selected usernames.
    If no usernames are selected, show all devices.
  */
  const selectedComputers = useMemo(() => {
    if (selectedNames.length === 0) {
      return computers;
    }
    const selected: IJamfComputer[] = [];
    computersByUser.forEach((computers, username) => {
      if (selectedNames.includes(username)) {
        selected.push(...computers);
      }
    });

    return selected;
  }, [selectedNames, computersByUser, computers]);

  const isOSUpToDate = useCallback(
    (osVersion: string): boolean => {
      if (macOSUpdates.availableUpdates.length === 0) {
        return true;
      }

      const osMajorVersionNumber = Number(osVersion.split('.')[0]);
      const latestOSMajorVersionNumber = Number(
        macOSUpdates.availableUpdates[0].split('.')[0]
      );
      return osMajorVersionNumber >= latestOSMajorVersionNumber;
    },
    [macOSUpdates.availableUpdates]
  );

  const updateMacOS = useCallback(
    async (computers: IJamfComputer) => {
      console.log('update OS', computers.general.name);
      notifyInApp({
        success: true,
        sucessMessage: `Updating ${computers.general.name} to macOS ${macOSUpdates.availableUpdates[0]}`,
        errorMessage: `Failed to update ${computers.general.name} to macOS ${macOSUpdates.availableUpdates[0]}`,
      });
    },
    [notifyInApp, macOSUpdates.availableUpdates]
  );

  const enableFirewall = useCallback(
    async (computers: IJamfComputer) => {
      console.log('enable firewall', computers.general.name);
      notifyInApp({
        success: true,
        sucessMessage: `Enabled firewall for ${computers.general.name}`,
        errorMessage: `Failed to enable firewall for ${computers.general.name}`,
      });
    },

    [notifyInApp]
  );
  const encryptDisk = useCallback(
    async (computers: IJamfComputer) => {
      console.log('encrypt disk', computers.general.name);
      notifyInApp({
        success: true,
        sucessMessage: `Encrypting disk for ${computers.general.name}`,
        errorMessage: `Failed to encrypt disk for ${computers.general.name}`,
      });
    },
    [notifyInApp]
  );

  const requestRemoteManagement = useCallback(
    async (computers: IJamfComputer) => {
      console.log('request remote management', computers.general.name);
      notifyInApp({
        success: true,
        sucessMessage: `Requested remote management for ${computers.general.name}`,
        errorMessage: `Failed to request remote management for ${computers.general.name}`,
      });
    },
    [notifyInApp]
  );

  return (
    <>
      <Group position="apart">
        <Group spacing={5}>
          <IconDevices2 size={18} />
          <Text size={18}>Devices</Text>
        </Group>

        <MultiSelectBox<string>
          onValueChange={(value) => setSelectedNames(value)}
          placeholder="Select Users..."
          maxWidth="max-w-xs"
        >
          {Array.from(computersByUser.keys()).map((realname) => (
            <MultiSelectBoxItem
              key={realname}
              value={realname}
              text={realname}
            />
          ))}
        </MultiSelectBox>
      </Group>
      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Device Name</TableHeaderCell>
            <TableHeaderCell textAlignment="text-left">
              Remote Management
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-left">
              Operating System
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-left">
              Disk Encryption Status
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-left">
              Firewall Status
            </TableHeaderCell>
            <TableHeaderCell textAlignment="text-left">
              Device Users
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {selectedComputers.map((computer) => (
            <TableRow key={computer.id}>
              <TableCell textAlignment="text-left">
                <Group spacing={5}>
                  {computer.general.platform === 'Mac' ? (
                    <IconDeviceDesktop size={18} />
                  ) : (
                    <IconDeviceMobile size={18} />
                  )}

                  <TruncateText
                    text={computer.general.name}
                    textProps={{ size: 'xs', weight: 'bold', tt: 'uppercase' }}
                    maxWidth="80%"
                  />
                </Group>
              </TableCell>
              <TableCell textAlignment="text-left">
                <Group spacing={5}>
                  {computer.general.remoteManagement.managed ? (
                    <Tooltip
                      label="Remote management enabled"
                      color="dark.3"
                      withArrow
                      arrowSize={6}
                      events={{ hover: true, focus: true, touch: false }}
                    >
                      <Badge color="green.7" size="sm" p={3} py={3}>
                        <IconShieldCheck size={14} color="green" />
                      </Badge>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      label="request remote management"
                      color="dark.3"
                      withArrow
                      arrowSize={6}
                      events={{ hover: true, focus: true, touch: false }}
                    >
                      <ActionIcon
                        bg="gray.1"
                        onClick={() => requestRemoteManagement(computer)}
                      >
                        <IconMailForward size={18} />
                      </ActionIcon>
                    </Tooltip>
                  )}

                  <Text tt="lowercase">
                    {computer.general.remoteManagement.managed
                      ? 'managed'
                      : 'not managed'}
                  </Text>
                </Group>
              </TableCell>
              <TableCell textAlignment="text-left">
                <Group spacing={5}>
                  {isOSUpToDate(computer.operatingSystem.version) ? (
                    <Tooltip
                      label="OS up to date"
                      color="dark.3"
                      withArrow
                      arrowSize={6}
                      events={{ hover: true, focus: true, touch: false }}
                    >
                      <Badge color="green.7" size="sm" p={3} py={3}>
                        <IconShieldCheck size={14} color="green" />
                      </Badge>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      label="update OS"
                      color="dark.3"
                      withArrow
                      arrowSize={6}
                      events={{ hover: true, focus: true, touch: false }}
                    >
                      <ActionIcon
                        bg="gray.1"
                        onClick={() => updateMacOS(computer)}
                      >
                        <IconToggleRight size={18} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                  <TruncateText
                    text={`${computer.operatingSystem.name} ${computer.operatingSystem.version}`}
                    maxWidth="70%"
                  />
                </Group>
              </TableCell>
              <TableCell textAlignment="text-left">
                <Group spacing={5}>
                  {computer.operatingSystem.fileVault2Status ===
                  'ALL_ENCRYPTED' ? (
                    <Tooltip
                      label="Full disk encryption enabled"
                      color="dark.3"
                      withArrow
                      arrowSize={6}
                      events={{ hover: true, focus: true, touch: false }}
                    >
                      <Badge color="green.7" size="sm" p={3} py={3}>
                        <IconShieldCheck size={14} color="green" />
                      </Badge>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      label="enable full encryption"
                      color="dark.3"
                      withArrow
                      arrowSize={6}
                      events={{ hover: true, focus: true, touch: false }}
                    >
                      <ActionIcon
                        bg="gray.1"
                        variant="outline"
                        onClick={() => encryptDisk(computer)}
                      >
                        <IconToggleRight size={18} />
                      </ActionIcon>
                    </Tooltip>
                  )}

                  <TruncateText
                    maxWidth="65%"
                    text={computer.operatingSystem.fileVault2Status
                      .split('_')
                      .join(' ')
                      .toLowerCase()}
                  />
                </Group>
              </TableCell>
              <TableCell>
                <Group spacing={5}>
                  {computer.security.firewallEnabled ? (
                    <Tooltip
                      label="Firewall enabled"
                      color="dark.3"
                      withArrow
                      arrowSize={6}
                      events={{ hover: true, focus: true, touch: false }}
                    >
                      <Badge color="green.7" size="sm" p={3} py={3}>
                        <IconShieldCheck size={14} color="green" />
                      </Badge>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      label="enable firewall"
                      color="dark.3"
                      withArrow
                      arrowSize={6}
                      events={{ hover: true, focus: true, touch: false }}
                    >
                      <ActionIcon
                        bg="gray.1"
                        onClick={() => enableFirewall(computer)}
                      >
                        <IconToggleRight size={18} />
                      </ActionIcon>
                    </Tooltip>
                  )}

                  <Text tt="lowercase">
                    {computer.security.firewallEnabled ? 'enabled' : 'disabled'}
                  </Text>
                </Group>
              </TableCell>
              <TableCell textAlignment="text-left">
                <Stack m={0} p={0}>
                  {computer.localUserAccounts.map((user) => (
                    <Group key={user.uid} spacing={5} p={0}>
                      {user.admin ? (
                        <Tooltip
                          label="admin"
                          color="dark.3"
                          withArrow
                          arrowSize={6}
                          events={{ hover: true, focus: true, touch: false }}
                        >
                          <Badge color="gray.9" size="sm" p={3} py={3}>
                            <IconUserPlus size={18} />
                          </Badge>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          label="standard user"
                          color="dark.3"
                          withArrow
                          arrowSize={6}
                          events={{ hover: true, focus: true, touch: false }}
                        >
                          <Badge color="gray.5" size="sm" p={3} py={3}>
                            <IconUser size={18} />
                          </Badge>
                        </Tooltip>
                      )}

                      <TruncateText
                        text={user.fullName.trim()}
                        maxWidth="70%"
                      />
                    </Group>
                  ))}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
