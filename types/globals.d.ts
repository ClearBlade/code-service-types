/// <reference types="node" />
/* eslint-disable no-var */
declare var ClearBlade: CbServer.ClearBladeGlobal;
declare var ClearBladeAsync: CbServer.ClearBladeAsync;
declare var MQTT: CbServer.MQTT;
declare var child_process: CbServer.ChildProcess;
declare var ClearBladeAI: CbServer.ClearBladeAI;
type Logger = (message?: unknown, ...args: unknown[]) => void;
declare var log: Logger;
declare function Requests(): {
  put: (
    options: { [key: string]: unknown },
    callback: (data: unknown) => void
  ) => void;
  get: (
    options: Record<string, unknown>,
    callback: (err: unknown, data: string) => void
  ) => void;
  post: (
    options: Record<string, unknown>,
    callback: (err: unknown, data: string) => void
  ) => void;
  delete: (
    options: Record<string, unknown>,
    callback: (err: unknown, data: string) => void
  ) => void;
};
declare var cbmeta: {
  is_edge: boolean;
  platform_url: string;
  service_id: string;
  service_name: string;
  system_key: string;
  system_secret: string;
};
/**
 * Override the Response from lib.dom.d.ts since the
 * fetch library in the ClearBlade code engine returns values directly
 * rather than returning a promise to the value
 * See differences here https://github.com/ClearBlade/native-libraries/blob/master/fetch.md#fetch
 *
 */
interface Response {
  json(): unknown;
  text(): string;
}
/* eslint-enable no-var */
