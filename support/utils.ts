import * as seleniumWebdriver from 'selenium-webdriver';
import * as fs from 'fs-extra';
import * as makeDir from 'make-dir';
import { Options } from 'selenium-webdriver/chrome';

export const createSeleniumDriverSession = (caps: any) => {
  const builder = new seleniumWebdriver.Builder();
  return builder.forBrowser(caps.browserName)
    .withCapabilities(caps)
    .build();
}

export const createSeleniumDriverSessionHeadless = (caps: any) => {
  const builder = new seleniumWebdriver.Builder();
  const options = new Options();
  options.addArguments('headless');
  return builder.forBrowser(caps.browserName)
    .setChromeOptions(options)
    .withCapabilities(caps)
    .build();
}


export const saveScreenshot = async (data: any, name: string) => {
  if (name === '' || name === null) {
    throw new Error('Unable to save the screenshot, the test name not defined');
  }
  const path = `results/mochawesome-report/assets/`;
  const filename = `${path}${name}`;
  await makeDir(path);
  await fs.writeFile(filename, data, { encoding: 'base64', flag: 'wx' });
};
