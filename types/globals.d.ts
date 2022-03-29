/// <reference types="node" />
/* eslint-disable no-var */
declare var ClearBlade: CbServer.ClearBladeGlobal;
declare var ClearBladeAsync: CbServer.ClearBladeAsync;
declare var MQTT: CbServer.MQTT;
declare var child_process: CbServer.ChildProcess;
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
/* eslint-enable no-var */
