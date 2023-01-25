export type TJamfApiError = { httpStatus: number; errors: any[] };

export type TJamfApiKey = {
  token: string;
  expires: string;
};

export type TJamfInventoryInfo = {
  managedComputers: number;
  unmanagedComputers: number;
  managedDevices: number;
  unmanagedDevices: number;
};

export interface IJamfComputer {
  id: string;
  uuid: string;
  general: {
    name: string;
    platform: string;
    remoteManagement: {
      managed: boolean;
      managementUsername: string;
    };
    supervised: boolean;
  };
  diskEncryption: {
    bootPartitionEncryptionDetails: {
      partitionName: string;
      partitionFileVault2State:
        | 'UNKNOWN'
        | 'UNENCRYPTED'
        | 'INELIGIBLE'
        | 'DECRYPTED'
        | 'DECRYPTING'
        | 'ENCRYPTED'
        | 'ENCRYPTING'
        | 'RESTART_NEEDED'
        | 'OPTIMIZING'
        | 'DECRYPTING_PAUSED'
        | 'ENCRYPTING_PAUSED';
      partitionFileVault2Percent: number;
    };
    individualRecoveryKeyValidityStatus:
      | 'VALID'
      | 'INVALID'
      | 'UNKNOWN'
      | 'NOT_APPLICABLE';
    institutionalRecoveryKeyPresent: boolean;
    diskEncryptionConfigurationName: string;
    fileVault2EnabledUserNames: string[];
    fileVault2EligibilityMessage: string;
  };
  userAndLocation: {
    username: string;
    realname: string;
    email: string;
    position: string;
    phoneNumber: string;
    department: string;
    building: string;
    room: string;
  };
  localUserAccounts: {
    uid: string;
    username: string;
    fullName: string;
    admin: boolean;
    homeDirectory: string;
    homeDirectorySizeMb: number;
    fileVault2Enabled: boolean;
    userAccountType: 'LOCAL' | 'NETWORK' | 'GLOBAL';
    passwordMinLength: number;
    passwordMaxAge: number;
    passwordMinComplexCharacters: number;
    passwordHistoryDepth: number;
    passwordRequireAlphanumeric: boolean;
    computerAzureActiveDirectoryId: string;
    userAzureActiveDirectoryId: string;
    azureActiveDirectoryId:
      | 'ACTIVATED'
      | 'NOT_ACTIVATED'
      | 'NOT_APPLICABLE'
      | 'NOT_COLLECTED';
  }[];
  security: {
    sipStatus: 'ENABLED' | 'DISABLED' | 'NOT_AVAILABLE' | 'NOT_COLLECTED';
    gatekeeperStatus:
      | 'NOT_COLLECT'
      | 'DISABLED'
      | 'APP_STORE'
      | 'APP_STORE_AND_IDENTIFIED_DEVELOPERS';
    xprotectVersion: string;
    autoLoginDisabled: boolean;
    remoteDesktopEnabled: boolean;
    activationLockEnabled: boolean;
    recoveryLockEnabled: boolean;
    firewallEnabled: boolean;
    secureBootLevel:
      | 'NO_SECURITY'
      | 'MEDIUM_SECURITY'
      | 'FULL_SECURITY'
      | 'NOT_SUPPORTED'
      | 'UNKNOWN';
    externalBootLevel:
      | 'ALLOW_BOOTING_FROM_EXTERNAL_MEDIA'
      | 'DISALLOW_BOOTING_FROM_EXTERNAL_MEDIA'
      | 'NOT_SUPPORTED'
      | 'UNKNOWN';
    bootsrapTokenAllowed: boolean;
  };
  operatingSystem: {
    name: string;
    version: string;
    build: string;
    activeDirectoryStatus: string;
    fileVault2Status:
      | 'ALL_ENCRYPTED'
      | 'BOOT_ENCRYPTED'
      | 'SOME_ENCRYPTION'
      | 'NOT_ENCRYPTED'
      | 'NOT_APPLICABLE';
    softwareUpdateDeviceId: string;
    extensionAttributes: {
      definitionId: string;
      name: string;
      description: string;
      enabled: boolean;
      multiValue: boolean;
      values: string[];
      dataType: 'STRING' | 'INTEGER' | 'DATE_TIME';
      options: string[];
      inputType: 'TEXT' | 'POPUP' | 'SCRIPT' | 'LDAP';
    }[];
  };
}

export interface IJamfComputerInventory {
  totalCount: number;
  results: IJamfComputer[];
}

const fakeJamfComputer: IJamfComputer = {
  id: '123',
  uuid: '123',
  general: {
    name: 'Fake Computer',
    platform: 'Mac',
    remoteManagement: {
      managed: false,
      managementUsername: 'jamf',
    },
    supervised: false,
  },
  diskEncryption: {
    bootPartitionEncryptionDetails: {
      partitionName: 'Fake Partition',
      partitionFileVault2State: 'ENCRYPTED',
      partitionFileVault2Percent: 100,
    },
    individualRecoveryKeyValidityStatus: 'VALID',
    institutionalRecoveryKeyPresent: true,
    diskEncryptionConfigurationName: 'Fake Configuration',
    fileVault2EnabledUserNames: ['jamf'],
    fileVault2EligibilityMessage: 'Fake Eligibility Message',
  },
  userAndLocation: {
    username: 'jamf',
    realname: 'Jamf User',
    email: 'test1@gmail.com',
    position: 'Fake Position',
    phoneNumber: '123-456-7890',
    department: 'Fake Department',
    building: 'Fake Building',
    room: 'Fake Room',
  },
  localUserAccounts: [
    {
      uid: '123',
      username: 'jamf',
      fullName: 'Jamf User',
      admin: false,
      homeDirectory: '/Users/jamf',
      homeDirectorySizeMb: 100,
      fileVault2Enabled: true,
      userAccountType: 'LOCAL',
      passwordMinLength: 8,
      passwordMaxAge: 90,
      passwordMinComplexCharacters: 1,
      passwordHistoryDepth: 0,

      passwordRequireAlphanumeric: false,
      computerAzureActiveDirectoryId: '123',
      userAzureActiveDirectoryId: '123',
      azureActiveDirectoryId: 'ACTIVATED',
    },
  ],
  security: {
    sipStatus: 'ENABLED',
    gatekeeperStatus: 'APP_STORE_AND_IDENTIFIED_DEVELOPERS',
    xprotectVersion: 'Fake Version',
    autoLoginDisabled: false,
    remoteDesktopEnabled: false,

    activationLockEnabled: false,
    recoveryLockEnabled: false,
    firewallEnabled: false,

    secureBootLevel: 'FULL_SECURITY',
    externalBootLevel: 'ALLOW_BOOTING_FROM_EXTERNAL_MEDIA',
    bootsrapTokenAllowed: false,
  },
  operatingSystem: {
    name: 'Fake OS',
    version: '10.15.7',
    build: '19H2',
    activeDirectoryStatus: 'Fake Status',
    fileVault2Status: 'ALL_ENCRYPTED',
    softwareUpdateDeviceId: '123',
    extensionAttributes: [
      {
        definitionId: '123',
        name: 'Fake Extension Attribute',
        description: 'Fake Description',
        enabled: true,
        multiValue: false,
        values: ['Fake Value'],

        dataType: 'STRING',
        options: ['Fake Option'],
        inputType: 'TEXT',
      },
    ],
  },
};

export interface IJamfMacOSUpdates {
  availableUpdates: string[];
}

export interface IJamfPostMacOSUpdateBody {
  groupId: string;
  maxDeferrals: number;
  version: string;
  skipVersionVerification: boolean;
  applyMajorUpdate: boolean;
  updateAction: 'DOWNLOAD_AND_INSTALL' | 'DOWNLOAD_ONLY';
  forceRestart: boolean;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface IJamfPostMacOSUpdateResponse {
  responses: {
    id: string;
    href: string;
  }[];
  errors: {
    code: string;
    field: string;
    description: string;
    id: string;
  }[];
}

export const makeFakeJamfComputer = (
  overrides?: Partial<IJamfComputer>
): IJamfComputer => ({
  ...fakeJamfComputer,
  ...overrides,
});
