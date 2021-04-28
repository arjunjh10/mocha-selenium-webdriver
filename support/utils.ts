/* eslint-disable @typescript-eslint/no-explicit-any */
import * as seleniumWebdriver from 'selenium-webdriver';
import * as fs from 'fs-extra';
import * as makeDir from 'make-dir';
import { Options } from 'selenium-webdriver/chrome';
import { BrowserCapabilities } from './capabilities';
import * as CryptoJS from 'crypto-js';

export const createSeleniumDriverSession = (caps: BrowserCapabilities) => {
  const builder = new seleniumWebdriver.Builder();
  return builder.forBrowser(caps.browserName)
    .withCapabilities(caps)
    .build();
};

export const createSeleniumDriverSessionHeadless = (caps: BrowserCapabilities) => {
  const builder = new seleniumWebdriver.Builder();
  const options = new Options();
  options.addArguments('headless');
  return builder.forBrowser(caps.browserName)
    .setChromeOptions(options)
    .withCapabilities(caps)
    .build();
};


export const saveScreenshot = async (data: any, name: string) => {
  if (name === '' || name === null) {
    throw new Error('Unable to save the screenshot, the test name not defined');
  }
  const path = 'results/mochawesome-report/assets/';
  const filename = `${path}${name}`;
  await makeDir(path);
  await fs.writeFile(filename, data, { encoding: 'base64', flag: 'wx' });
};

export const decryptPassword = (cipherText: string) => {
  const decrypted = CryptoJS.AES.decrypt(cipherText, 'Secret Passphrase');
  return decrypted.toString(CryptoJS.enc.Utf8);
};