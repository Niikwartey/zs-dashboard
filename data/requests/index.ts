import {
  IJamfComputerInventory,
  IJamfMacOSUpdates,
  IJamfPostMacOSUpdateBody,
  TJamfApiKey,
} from '@/data/schemas';

const username = process.env.JAMF_USERNAME;
const password = process.env.JAMF_PASSWORD;
const url = process.env.JAMF_URL;
export let apiKey: TJamfApiKey | undefined;
let apiKeyAcquiredAt: string | undefined;

function isApiTokenValid(key: TJamfApiKey): boolean {
  // TODO: check if bearer token exists and is valid (not expired)\
  return !!key;
}

export function getJamfApiToken(): Promise<TJamfApiKey> {
  if (apiKey && apiKeyAcquiredAt && isApiTokenValid(apiKey)) {
    console.log(`Using cached API key acquired at ${apiKeyAcquiredAt}`);
    return Promise.resolve(apiKey);
  }

  const newApiKeyRequestedAt = new Date().toISOString();
  return fetch(`${url}/api/v1/auth/token`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then((response) => {
      apiKey = response;
      apiKeyAcquiredAt = newApiKeyRequestedAt;
      return response;
    });
}

export function getJamfInventoryInfo(): Promise<IJamfComputerInventory> {
  if (!apiKey || !apiKeyAcquiredAt || !isApiTokenValid(apiKey)) {
    throw Error('Api token is invalid');
  }

  return fetch(`${url}/uapi/v1/inventory-information`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey.token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  });
}

export function getComputerInventory(): Promise<IJamfComputerInventory> {
  if (!apiKey || !apiKeyAcquiredAt || !isApiTokenValid(apiKey)) {
    throw Error('Api token is invalid');
  }

  return fetch(
    `${url}/api/v1/computers-inventory?section=GENERAL&section=DISK_ENCRYPTION&section=OPERATING_SYSTEM&section=SECURITY&section=USER_AND_LOCATION&section=LOCAL_USER_ACCOUNTS&page=0&page-size=100&sort=userAndLocation.realname%3Aasc`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey.token}`,
      },
    }
  ).then((response) => {
    if (response.status === 400) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  });
}

export function getJamfMacOsUpdates(): Promise<IJamfMacOSUpdates> {
  if (!apiKey || !apiKeyAcquiredAt || !isApiTokenValid(apiKey)) {
    throw Error('Api token is invalid');
  }

  return fetch(
    `${url}/api/v1/macos-managed-software-updates/available-updates`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey.token}`,
      },
    }
  ).then((response) => {
    if (response.status === 400) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  });
}

function makeJamfMacOSUpdateBody(): IJamfPostMacOSUpdateBody {
  return {
    groupId: '1',
    maxDeferrals: 2,
    version: '11.6.1',
    skipVersionVerification: false,
    applyMajorUpdate: false,
    updateAction: 'DOWNLOAD_AND_INSTALL',
    forceRestart: false,
    priority: 'HIGH',
  };
}

export function postJamfMacOSUpdates(
  body: IJamfPostMacOSUpdateBody
): Promise<any> {
  if (!apiKey || !apiKeyAcquiredAt || !isApiTokenValid(apiKey)) {
    throw Error('Api token is invalid');
  }

  return fetch(`${url}/api/v1/macos-managed-software-updates/send-updates`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${apiKey.token}`,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  });
}
