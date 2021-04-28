/* eslint-disable  @typescript-eslint/naming-convention*/
export interface BrowserCapabilities {
    browser: 'chrome' | 'firefox' | 'edge' | 'android' | 'ios' | 'safari';
    browserName: 'chrome' | 'firefox' | 'edge' | 'galaxy s8' | 'iPhone' | 'safari';
    os?: string;
    os_version?: string;
    resolution?: string;
    chromeOptions?: Record<string, unknown>;
    device?: string;
}
export const chrome: BrowserCapabilities = {
  browser: 'chrome',
  browserName: 'chrome'
};

export const safari: BrowserCapabilities = {
  browser: 'safari',
  browserName: 'safari',
  os: 'OS X',
  os_version: 'High Sierra'
};

export const firefox: BrowserCapabilities = {
  browser: 'firefox',
  browserName: 'firefox',
  os: 'OS X',
  os_version: 'High Sierra'
};

export const Edge: BrowserCapabilities = {
  browser: 'edge',
  browserName: 'edge',
  os: 'Windows',
  os_version: '10'
};
