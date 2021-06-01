/* eslint-disable no-var */
declare var ClearBlade: CbServer.ClearBladeGlobal;
declare var ClearBladeAsync: CbServer.ClearBladeAsync;
declare var MQTT: CbServer.MQTT;
type Logger = (message?: unknown, ...args: unknown[]) => void;
declare var log: Logger;
/* eslint-enable no-var */
