import {SafariApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {SafariApiApplication};

export async function main(options?: ApplicationConfig) {
  const app = new SafariApiApplication(options);
  await app.boot();
  await app.start();
  return app;
}
