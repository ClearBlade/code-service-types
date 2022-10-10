// Custom Type definitions for non-npm package clearbladejs-server
// Project: https://github.com/ClearBlade/native-libraries/blob/master/clearblade.md
// Definitions by: Jim Bouquet <https://github.com/ClearBlade>
//                 Clark Bynum <https://github.com/ClearBlade>
// Minimum TypeScript Version: 4.1
declare namespace CbServer {
  namespace ColumnTypes {
    type String = string | null;
    type Number = number | null;
    type Timestamp = string | null;
    type JsonB<JsonType> = JsonType | null;
  }

  interface CollectionItem {
    item_id: string;
  }

  interface CallerInfo {
    userid: string;
    userToken: string;
    userEmail: string;
  }
  interface BasicReq<T = {}> extends CallerInfo {
    readonly isLogging: boolean;
    readonly params: T & TriggerTypes & Partial<WebhookParams>;
    readonly systemKey: string;
    readonly systemSecret: string;
    readonly service_instance_id: string;
    readonly caller: CallerInfo;
  }
  interface WebhookParams {
    method: string;
    uri: string;
    body: unknown;
    query: Record<string, string[]>;
    headers: Record<string, string[]>;
  }
  type ReqTypes = BasicReq;
  let req: ReqTypes;
  interface Resp {
    error(msg: unknown): never;
    success(msg: unknown): never;
    send(msg?: unknown): never;
    set(headers: object): void;
    status(status_code: number): void;
  }
  interface PreloaderResp {
    error(msg: unknown): void;
    success(msg: unknown): void;
    send(msg?: unknown): void;
    set(headers: object): void;
    status(status_code: number): void;
  }
  let resp: Resp;
  enum MessagingQOS {
    MESSAGING_QOS_AT_MOST_ONCE = 0,
    MESSAGING_QOS_AT_LEAST_ONCE = 1,
    MESSAGING_QOS_EXACTLY_ONCE = 2,
  }
  interface InitOptions {
    systemKey: string;
    systemSecret: string;
    logging?: boolean;
    callback?: CbCallback;
    authToken?: string;
    userToken?: string;
    email?: string;
    password?: string;
    registerUser?: boolean;
    useUser?: APIUser;
    URI?: string;
    messagingURI?: string;
    messagingPort?: number;
    defaultQoS?: MessagingQOS;
    callTimeout?: number;
  }
  interface APIUser {
    email: string;
    authToken: string;
    user_id?: string;
  }
  interface KeyValuePair {
    [key: string]: unknown;
  }
  type CbCallback<T = unknown> = (error: boolean, response: T) => void;
  interface ClearBladeGlobal extends ClearBladeInt {
    user: APIUser;
  }
  interface ClearBladeInt {
    URI: string;
    Trigger: TriggerClass;
    Timer: TimerClass;
    about(): string;
    addToQuery(queryObj: PlatformQuery, key: string, value: string): void;
    addFilterToQuery(
      queryObj: PlatformQuery,
      condition: QueryConditions,
      key: string,
      value: QueryValue
    ): void;
    addSortToQuery(
      queryObj: PlatformQuery,
      direction: QuerySortDirections,
      column: string
    ): void;
    Code(): Code;
    Collection<T extends object>(
      options:
        | string
        | CollectionOptionsWithName
        | CollectionOptionsWithID
        | CollectionOptionsWithCollection
    ): Collection<T>;
    Deployment(): Deployment;
    Device(): Device;
    edgeId(): string;
    execute(error: object, response: object, callback: CbCallback): void;
    getAllCollections(callback: CbCallback): void;
    http(): object;
    init(options: InitOptions | { request: BasicReq }): void;
    isEdge(): boolean;
    isCurrentUserAuthenticated(callback: CbCallback): void;
    isObjectEmpty(obj: object): boolean;
    Item(data: object, options: string | ItemOptions): Item;
    Lock(lockName: string, streamServiceIdentifier: string): Lock;
    logger(message: string): void;
    loginAnon(callback: CbCallback): void;
    loginUser(email: string, password: string, callback: CbCallback): void;
    logoutUser(callback: CbCallback): void;
    makeKVPair(key: string, value: string): KeyValuePair;
    Messaging(options?: MessagingOptions, callback?: CbCallback): Messaging;
    newCollection(name: string, callback: CbCallback): void;
    Query(
      options?:
        | QueryOptionsWithCollection
        | QueryOptionsWithName
        | QueryOptionsWithID
    ): PlatformQuery;
    registerUser(email: string, password: string, callback: CbCallback): void;
    setUser(email: string, authToken: string, userId: string): void;
    User(): AppUser;
    Cache<T extends object>(name: string): Cache<T>;
    createDevice(
      name: string,
      data: object,
      causeTrigger: boolean,
      callback: CbCallback
    ): void;
    deleteDevice(
      name: string,
      causeTrigger: boolean,
      callback: CbCallback
    ): void;
    updateDevice(
      name: string,
      data: object,
      causeTrigger: boolean,
      callback: CbCallback
    ): void;
    getDeviceByName(name: string, callback: CbCallback): void;
    getAllDevicesForSystem(callback: CbCallback): void;
    validateEmailPassword(email: string, password: string): void;
    Database(options?: { externalDBName: string }): Database;
    Roles(): Roles;
  }
  interface CollectionOptionsWithCollection {
    collection: string;
  }
  interface CollectionOptionsWithName {
    collectionName: string;
  }
  interface CollectionOptionsWithID {
    collectionID: string;
  }
  type CollectionSchema<T extends {} = {}> = T & {
    item_id: string;
  };
  interface CollectionFetchData<T extends {} = {}> {
    DATA: Array<CollectionSchema<T>>;
    CURRENTPAGE: number;
    NEXTPAGEURL: string | null;
    PREVPAGEURL: string | null;
    TOTAL: number;
  }
  interface Collection<T extends object> {
    user: APIUser;
    URI: string;
    systemKey: string;
    systemSecret: string;
    addColumn(options: object, callback: CbCallback): void;
    dropColumn(name: string, callback: CbCallback): void;
    deleteCollection(callback: CbCallback): void;
    fetch(
      query: PlatformQuery,
      callback: CbCallback<CollectionFetchData<T>>
    ): void;
    fetch(callback: CbCallback<CollectionFetchData<T>>): void;
    create(
      newItem: Partial<T> | Array<Partial<T>>,
      callback: CbCallback<CollectionSchema[]>
    ): void;
    update(
      query: PlatformQuery,
      changes: object,
      callback: CbCallback<"success">
    ): void;
    remove(query: PlatformQuery, callback: CbCallback): void;
    columns(callback: CbCallback): void;
    count(query: PlatformQuery, callback: CbCallback<{ count: number }>): void;
  }
  enum QuerySortDirections {
    QUERY_SORT_ASCENDING = "ASC",
    QUERY_SORT_DESCENDING = "DESC",
  }
  enum QueryConditions {
    QUERY_EQUAL = "EQ",
    QUERY_NOTEQUAL = "NEQ",
    QUERY_GREATERTHAN = "GT",
    QUERY_GREATERTHAN_EQUAL = "GTE",
    QUERY_LESSTHAN = "LT",
    QUERY_LESSTHAN_EQUAL = "LTE",
    QUERY_MATCHES = "RE",
  }
  type QueryValue =
    | string
    | number
    | boolean
    | Date
    | null
    | string[]
    | number[]
    | boolean[]
    | Date[];

  interface TriggerQuery {
    SELECTCOLUMNS?: string[];
    SORT?: QuerySortDirections;
    FILTERS?: TriggerQueryFilter[][];
    PAGESIZE?: number;
    PAGENUM?: number;
  }
  type TriggerQueryFilter = {
    [key in QueryConditions]?: Record<string, QueryValue>;
  };
  interface QueryOptions {
    offset?: number;
    limit?: number;
  }
  interface QueryOptionsWithCollection
    extends CollectionOptionsWithCollection,
      QueryOptions {}
  interface QueryOptionsWithName
    extends CollectionOptionsWithName,
      QueryOptions {}
  interface QueryOptionsWithID extends CollectionOptionsWithID, QueryOptions {}
  interface Query {
    Operator: string;
    Field: string;
    Value: unknown;
  }

  interface OrderInfo {
    SortOrder: boolean;
    OrderKey: string;
  }

  interface PlatformQueryState {
    PrimaryKey: string[];
    Order: OrderInfo[];
    PageSize: number;
    PageNumber: number;
    Queries: Query[][];
    Columns: string[];
    Distinct: string;
    GroupBy: string[];
    RawQuery: string;
  }
  interface SerializablePlatformQuery {
    query: PlatformQueryState;
  }
  interface PlatformQuery extends SerializablePlatformQuery {
    user: APIUser;
    collectionNameOrID: string;
    URI: string;
    systemKey: string;
    systemSecret: string;
    andFilter: (
      Operator: string,
      Field: string,
      Value: QueryValue
    ) => PlatformQuery;
    or: (q: PlatformQuery) => PlatformQuery;
    columns: (columns: string[]) => PlatformQuery;
    ascending: (field: string) => PlatformQuery;
    descending: (field: string) => PlatformQuery;
    equalTo: (field: string, value: QueryValue) => PlatformQuery;
    greaterThan: (field: string, value: QueryValue) => PlatformQuery;
    greaterThanEqualTo: (field: string, value: QueryValue) => PlatformQuery;
    lessThan: (field: string, value: QueryValue) => PlatformQuery;
    lessThanEqualTo: (field: string, value: QueryValue) => PlatformQuery;
    notEqualTo: (field: string, value: QueryValue) => PlatformQuery;
    matches: (field: string, pattern: string) => PlatformQuery;
    setPage: (pageSize: number, pageNum: number) => PlatformQuery;
    rawQuery: (rawQuery: string) => PlatformQuery;
    fetch<T extends {} = {}>(
      callback: CbCallback<CollectionFetchData<T>>
    ): PlatformQuery;
    update(changes: object, callback: CbCallback): PlatformQuery;
    remove(callback: CbCallback): PlatformQuery;
  }
  type ItemOptions = CollectionOptionsWithID;
  interface Item {
    data: object;
    save(): void;
    refresh(): void;
    destroy(): void;
  }
  interface Code {
    user: APIUser;
    systemKey: string;
    systemSecret: string;
    execute(
      name: string,
      params: object,
      loggingEnabled: boolean,
      callback: CbCallback
    ): void;
    getAllServices(callback: CbCallback): void;
  }
  interface DeploymentOptions {}
  interface Deployment {
    user: APIUser;
    systemKey: string;
    systemSecret: string;
    create(
      name: string,
      description: string,
      options: DeploymentOptions,
      callback: CbCallback
    ): void;
    update(
      name: string,
      options: DeploymentOptions,
      callback: CbCallback
    ): void;
    delete(name: string, callback: CbCallback): void;
    read(name: string, callback: CbCallback): void;
    readAll(query: PlatformQuery, callback: CbCallback): void;
  }
  interface AppUser {
    user: APIUser;
    URI: string;
    systemKey: string;
    systemSecret: string;
    getUser<T>(callback: CbCallback<T>): void;
    setUser(data: object, callback: CbCallback): void;
    setUsers(query: PlatformQuery, data: object, callback: CbCallback): void;
    allUsers<T>(query: PlatformQuery, callback: CbCallback<T>): void;
    count(query: PlatformQuery, callback: CbCallback<{ count: number }>): void;
  }
  type WaitForMessageCallback = (
    error: boolean,
    message: string,
    topic: string
  ) => void;
  interface Messaging {
    user: APIUser;
    systemKey: string;
    systemSecret: string;
    getMessageHistoryWithTimeFrame(
      topic: string,
      count: number,
      last: number,
      start: number,
      stop: number,
      callback: CbCallback
    ): void;
    getMessageHistory(
      topic: string,
      start: number,
      count: number,
      callback: CbCallback
    ): void;
    getAndDeleteMessageHistory(
      topic: string,
      count: number,
      last: number,
      start: number,
      stop: number,
      callback: CbCallback
    ): void;
    getCurrentTopics(callback: CbCallback): void;
    publish(topic: string, payload: string | ArrayBuffer): void;
    subscribe(topic: string, callback: CbCallback<string | null>): void;
    waitForMessage(topics: string[], wfmCallback: WaitForMessageCallback): void;
    setTimeout(
      timeout: number,
      topic: string,
      data: string,
      cb: CbCallback<string>
    ): void;
    cancelCBTimeout(id: string, cb: CbCallback<string>): void;
    setInterval(
      timeout: number,
      topic: string,
      data: string,
      iterations: number,
      cb: CbCallback<string>
    ): void;
    cancelCBInterval(id: string, cb: CbCallback<string>): void;
  }
  interface MessagingOptions {}
  interface Device {
    URI: string;
    systemKey: string;
    systemSecret: string;
    fetch(query: PlatformQuery, callback: CbCallback): void;
    update(query: PlatformQuery, changes: object, callback: CbCallback): void;
    delete(query: PlatformQuery, callback: CbCallback): void;
    create(newDevice: object, callback: CbCallback): void;
  }
  enum TriggerModule {
    DEVICE = "Device",
    Data = "Data",
    MESSAGING = "Messaging",
    USER = "User",
  }
  interface TriggerCreateOptions {
    system_key: string;
    name: string;
    def_module: TriggerModule;
    def_name: string;
    key_value_pairs: KeyValuePair[];
    service_name: string;
  }
  interface TriggerClass {
    Create(
      name: string,
      options: TriggerCreateOptions,
      callback: CbCallback
    ): void;
    Fetch(name: string, callback: CbCallback): void;
  }
  interface TimerCreateOptions {
    description?: string;
    start_time: string; // ISO 8601 Date in UTC, e.g., "2021-02-05T17:28:58.587Z"
    repeats: number;
    frequency: number;
    service_name: string;
  }
  type TimerUpdateOptions = Partial<TimerCreateOptions>;
  interface TimerClass {
    Create(
      name: string,
      options: TimerCreateOptions,
      callback: CbCallback
    ): void;
    Fetch(name: string, callback: CbCallback<TimerInstance>): void;
  }
  interface TriggerInstance {
    name: string;
    systemKey: string;
    Update(options: object, callback: CbCallback): void;
    Delete(callback: CbCallback): void;
  }
  interface TimerInstance {
    name: string;
    systemKey: string;
    Update(
      options: TimerUpdateOptions,
      callback: CbCallback<TimerInstance>
    ): void;
    Delete(callback: CbCallback): void;
  }
  interface Cache<T = unknown> {
    get(key: string, cb: CbCallback<T>): void;
    set(key: string, val: T, cb: CbCallback<string>): void;
    setnx(key: string, val: T, cb: CbCallback<string>): void;
    setMultiple(val: Record<string, T>, cb: CbCallback<string>): void;
    getAll(cb: CbCallback<T>): void;
    delete(key: string, cb: CbCallback<string>): void;
    flush(cb: CbCallback<string>): void;
  }

  interface Database {
    query<T extends object>(command: string, cb: CbCallback<T[]>): void;
    exec(command: string, cb: CbCallback<null>): void;
    performOperation<T>(cb: CbCallback<T>, command: string): void;
    performOperation<T>(cb: CbCallback<T>, ...commands: unknown[]): void;
    performOperationAsync<T>(cb: CbCallback<T>, command: string): void;
    performOperationAsync<T>(cb: CbCallback<T>, ...commands: unknown[]): void;
  }

  interface Role {
    description: string;
    name: string;
    role_id: string;
  }

  interface Roles {
    get(q: PlatformQuery, cb: CbCallback<Role[]>): void;
    getByName(name: string, cb: CbCallback<Role[]>): void;
    getRolesForUser(
      user_id: string,
      cb: CbCallback<
        Array<{
          role_id: string;
          user_id: string;
          user_role_id: string;
        }>
      >
    ): void;
  }

  interface Lock {
    lock(callback?: (err: boolean, lockType: string) => void): void;
    unlock(callback?: (err: boolean, lockType: string) => void): void;
    rlock(callback?: (err: boolean, lockType: string) => void): void;
    runlock(callback?: (err: boolean, lockType: string) => void): void;
  }

  interface AsyncPlatformQuery extends PlatformQueryState {
    andFilter: (
      Operator: string,
      Field: string,
      Value: QueryValue
    ) => AsyncPlatformQuery;
    or: (q: AsyncPlatformQuery) => AsyncPlatformQuery;
    equalTo: (field: string, value: QueryValue) => AsyncPlatformQuery;
    greaterThan: (field: string, value: QueryValue) => AsyncPlatformQuery;
    greaterThanEqualTo: (
      field: string,
      value: QueryValue
    ) => AsyncPlatformQuery;
    lessThan: (field: string, value: QueryValue) => AsyncPlatformQuery;
    lessThanEqualTo: (field: string, value: QueryValue) => AsyncPlatformQuery;
    notEqualTo: (field: string, value: QueryValue) => AsyncPlatformQuery;
    matches: (field: string, pattern: string) => AsyncPlatformQuery;
    setPage: (pageSize: number, pageNum: number) => AsyncPlatformQuery;
    columns: (columns: string[]) => AsyncPlatformQuery;
    ascending: (field: string) => AsyncPlatformQuery;
    descending: (field: string) => AsyncPlatformQuery;
    rawQuery: (rawQuery: string) => AsyncPlatformQuery;
  }
  interface ClearBladeAsync {
    Cache<T extends object>(name: string): CacheAsync<T>;
    Collection<T extends object>(
      options:
        | string
        | CollectionOptionsWithName
        | CollectionOptionsWithID
        | CollectionOptionsWithCollection
    ): CollectionAsync<T>;
    FS(deploymentName: string): FSAsync; // FileSystem
    File(deploymentName: string, path: string): FileAsync; // Single File
    Query(
      options?:
        | QueryOptionsWithCollection
        | QueryOptionsWithName
        | QueryOptionsWithID
    ): AsyncPlatformQuery;
    Lock(lockName: string, caller: string): LockAsync;
    newCollection(name: string): Promise<{ id: string; name: string }>;
    Database(options?: { externalDBName: string }): DatabaseAsync;
    Triggers(): TriggersAsync;
    Timers(): TimersAsync;
    Users<T extends object>(): UsersAsync<T>;
    Roles(): RolesAsync;
    Role(roleID: string): RoleAsync;
    Preloader<TRequestParams = {}>(): PreloaderAsync<TRequestParams>;
    CustomSync(): CustomSyncAsync;
    Secret(): SecretAsync;
    Edges(): EdgesAsync;
    Auth(): AuthAsync;
    Devices(): DevicesAsync;
  }

  interface PreloaderAsync<TRequestParams = {}> {
    listen: (
      callback: (
        newReq: BasicReq<TRequestParams>,
        rewResp: PreloaderResp
      ) => void
    ) => Promise<void>;
  }

  interface TriggersAsync {
    create(option: Omit<TriggerCreateOptions, "system_key">): Promise<object>;
    read(query: AsyncPlatformQuery): Promise<object[]>;
    update(query: AsyncPlatformQuery, changes: object): Promise<object[]>;
    delete(query: AsyncPlatformQuery): Promise<object>;
  }

  interface TimersAsyncCreateOptions extends TimerCreateOptions {
    name: string;
    user_id?: string;
    user_type?: 1 | 2 | 3; // user type of user_id (1=dev, 2=user, 3=device)
  }

  interface TimersAsync {
    create(option: TimersAsyncCreateOptions): Promise<object>;
    read(query: AsyncPlatformQuery): Promise<object[]>;
    update(query: AsyncPlatformQuery, changes: object): Promise<object[]>;
    delete(query: AsyncPlatformQuery): Promise<object>;
  }

  interface RolesAsync {
    grantedTo(id: string): Promise<string[]>;
    read(query?: AsyncPlatformQuery): Promise<Role[]>;
    create(info: { name: string; description?: string }): Promise<string>;
  }

  interface RoleAsync {
    applyTo(deviceNameOrUserID: string): Promise<void>;
    setPermissions(permissions: Permission | Permission[]): Promise<void>;
  }

  interface Permission {
    type: string;
    name?: string;
    level: number;
  }

  interface UsersAsync<T extends object> {
    create(user: T): Promise<T>;
    read(query?: AsyncPlatformQuery): Promise<T[]>;
    update(query: AsyncPlatformQuery, changes: T): Promise<void>;
    delete(query: AsyncPlatformQuery): Promise<void>;
    count(query: AsyncPlatformQuery): Promise<{ count: number }>;
  }

  interface CacheAsync<CacheValue> {
    get<GetValue = CacheValue>(key: string): Promise<GetValue | undefined>;
    set(key: string, value: CacheValue): Promise<unknown>;
    setnx(key: string, value: CacheValue): Promise<boolean>;
    getAll(): Promise<Record<string, CacheValue>>;
    delete(key: string): Promise<unknown>;
    flush(): Promise<unknown>;
    keys(pattern: string): Promise<string[]>;
  }

  interface FileStats {
    permissions: string;
    size: number;
  }
  interface FSAsync {
    readDir(path: string): Promise<string[]>;
    readFile(path: string, encoding?: string): Promise<string | Uint8Array>;
    writeFile(path: string, data: string | Uint8Array): Promise<unknown>;
    renameFile(oldPath: string, newPath: string): Promise<unknown>;
    copyFile(srcPath: string, dstPath: string): Promise<unknown>;
    deleteFile(path: string): Promise<unknown>;
    stat(path: string): Promise<FileStats>;
  }

  interface FileAsync {
    stat: Promise<FileStats>;
    read(encoding?: string): Promise<string | Uint8Array>;
    write(data: string | Uint8Array): Promise<unknown>;
    rename(newPath: string): Promise<unknown>;
    copy(dstPath: string): Promise<unknown>;
    delete(): Promise<unknown>;
  }

  interface DatabaseAsync {
    query(rawQuery: string, ...params: unknown[]): Promise<unknown[]>;
    exec(rawQuery: string, ...params: unknown[]): Promise<{ count: number }>;
    performOperation(command: string): Promise<unknown>;
    performOperation(...commands: unknown[]): Promise<unknown>;
  }

  interface CollectionAsync<T extends object> {
    deleteCollection(): Promise<string>;
    dropColumn(columnName: string): Promise<string>;
    addColumn(columnMeta: { name: string; type: string }): Promise<string>;
    columns(): Promise<
      Array<{
        ColumnName: string;
        ColumnType: string;
        PK: boolean;
      }>
    >;
    remove(query: AsyncPlatformQuery): Promise<string>;
    update(
      query: AsyncPlatformQuery,
      changes: object
    ): Promise<Array<CollectionSchema<T>>>;
    create(
      newItem: Partial<T> | Array<Partial<T>>
    ): Promise<Array<{ item_id: string }>>;
    fetch(query: AsyncPlatformQuery): Promise<CollectionFetchData<T>>;
    count(query: AsyncPlatformQuery): Promise<{ count: number }>;
    createIndex(columnName: string): Promise<string>;
    createUniqueIndex(columnName: string): Promise<string>;
    upsert(
      changes: Partial<T>,
      uniquelyIndexedColumn: string
    ): Promise<Array<CollectionSchema<T>>>;
  }

  interface CustomSyncAsync {
    Platform: string;
    AllEdges: string;
    Now: string;
    sync(
      collectionName: string,
      data: Record<string, unknown>,
      destination: string,
      interval?: string
    ): Promise<unknown[]>;
  }

  interface SecretAsync {
    create(info: string, data: unknown): Promise<unknown>;
    read(name: string): Promise<unknown>;
    readWithQuery(
      query: AsyncPlatformQuery
    ): Promise<{ name: string; data: unknown }>;
    update(name: string, data: unknown): Promise<unknown>;
    delete(name: string): Promise<unknown>;
    deleteWithQuery(query: AsyncPlatformQuery): Promise<unknown>;
  }

  interface EdgesAsync {
    create(info: Record<string, unknown>): Promise<Record<string, unknown>>;
    read(query: AsyncPlatformQuery): Promise<Array<Record<string, unknown>>>;
    update(
      query: AsyncPlatformQuery,
      changes: Record<string, unknown>
    ): Promise<Array<Record<string, unknown>>>;
    delete(query: AsyncPlatformQuery): Promise<unknown>;
  }

  interface AuthResponse {
    auth_token: string;
    refresh_token: string;
    expiry: number;
  }

  interface AuthAsync {
    authAnon: () => Promise<AuthResponse>;
    authDevice: (
      deviceName: string,
      deviceKey: string
    ) => Promise<AuthResponse>;
    authUser: (email: string, password: string) => Promise<AuthResponse>;
    reauth: (refreshToken: string) => Promise<AuthResponse>;
    impersonateUser: (userID: string) => Promise<AuthResponse>;
    userIDFromToken: (token: string) => Promise<string>;
  }

  interface BaseDevice {
    name: string;
  }

  interface DevicesAsync {
    create: (info: object) => Promise<BaseDevice>;
    read: (query: AsyncPlatformQuery) => Promise<BaseDevice[]>;
    update: (query: AsyncPlatformQuery, changes: object) => Promise<void>;
    delete: (query: AsyncPlatformQuery) => Promise<void>;
  }

  interface MQTT {
    Client: MQTTClientConstructor;
    Message(payload: string): MQTTMessage;
  }
  interface MQTTClientOptions {
    address: string;
    port: number;
    username: string;
    password: string;
    client_id: string;
    use_tls: boolean;
    tls_config: TLSConfig;
  }
  interface TLSConfig {
    client_cert: string;
    client_key: string;
    ca_cert: string;
  }
  interface MQTTMessage {
    payload: string;
    qos: number;
    retain: boolean;
    duplicate: boolean;
  }
  interface MQTTClientConstructor {
    new (options?: MQTTClientOptions): MQTTClient;
  }
  interface MQTTClient {
    subscribe(
      topic: string,
      onMessage: (topic: string, message: MQTTMessage) => void
    ): Promise<unknown>;
    publish(
      topic: string,
      payload: string | MQTTMessage,
      qos?: number,
      retain?: boolean
    ): Promise<unknown>;
  }

  interface ClearBladeAI {
    Model: ClearBladeAIModelConstructor;
  }
  interface ClearBladeAIModelOptions {
    bucket_set: string;
    path: string;
  }
  interface ClearBladeAIModelConstructor {
    new (options: ClearBladeAIModelOptions): ClearBladeAIModel;
  }
  type IOInfo = {
    name: string;
    type:
      | "unknown"
      | "tensor"
      | "sequence"
      | "map"
      | "opaque"
      | "sparse tensor"
      | "optional";
    dataType:
      | "float32"
      | "float64"
      | "int8"
      | "int16"
      | "int32"
      | "int64"
      | "uint8"
      | "uint16"
      | "uint32"
      | "complex64"
      | "complex128"
      | "bool"
      | "string";
    shape: number[];
  };
  interface ClearBladeAIModel {
    inputs: IOInfo[];
    outputs: IOInfo[];
    exec: (
      desiredOutputs: string[],
      inputs: Record<string, unknown[]>
    ) => Promise<unknown[]>;
  }

  interface LockAsync {
    lock(): Promise<unknown>;
    unlock(): Promise<unknown>;
    rlock(): Promise<unknown>;
    runlock(): Promise<unknown>;
  }

  type TriggerTypes =
    | MessagingTriggerTypes
    | DataTriggerTypes
    | UserTriggerTypes
    | DeviceTriggerTypes
    | EdgePlatformTriggerTypes
    | UserRolesTriggerTypes;

  type TriggerCategories =
    | "Messaging"
    | "Data"
    | "User"
    | "Device"
    | "StartConnectDisconnect"
    | "UserRoles";

  type MakeTrigger<
    TTriggerCategory extends TriggerCategories,
    TTriggerAction extends string,
    TTriggerInfo
  > = {
    // seems like tslint doesn't know how to handle template literal types
    // tslint:disable-next-line
    trigger?: `${TTriggerCategory}::${TTriggerAction}`;
  } & TTriggerInfo;

  /**
   * Messaging trigger types
   */

  type MessagingTriggerTypes =
    | MessagingPublishTrigger
    | MessagingSubscribeTrigger
    | MessagingUnsubscribeTrigger
    | MessagingUserConnectedTrigger
    | MessagingUserDisconnectedTrigger
    | MessagingDeviceConnectedTrigger
    | MessagingDeviceDisconnectedTrigger;

  type MakeMessagingTrigger<
    TTriggerAction extends string,
    TTriggerInfo
  > = MakeTrigger<"Messaging", TTriggerAction, TTriggerInfo>;

  type MakeMessagingPubSubTrigger<TTriggerAction extends string> =
    MakeMessagingTrigger<
      TTriggerAction,
      { topic: string; body: string; userId: string }
    >;

  type MessagingPublishTrigger = MakeMessagingPubSubTrigger<"Publish">;
  type MessagingSubscribeTrigger = MakeMessagingPubSubTrigger<"Subscribe">;
  type MessagingUnsubscribeTrigger = MakeMessagingPubSubTrigger<"Unsubscribe">;

  type MakeMessagingUserConnectionTrigger<TTriggerAction extends string> =
    MakeMessagingTrigger<TTriggerAction, { email: string }>;

  type MessagingUserConnectedTrigger =
    MakeMessagingUserConnectionTrigger<"MQTTUserConnected">;
  type MessagingUserDisconnectedTrigger =
    MakeMessagingUserConnectionTrigger<"MQTTUserDisconnected">;

  type MakeMessagingDeviceConnectionTrigger<TTriggerAction extends string> =
    MakeMessagingTrigger<TTriggerAction, { deviceName: string }>;

  type MessagingDeviceConnectedTrigger =
    MakeMessagingDeviceConnectionTrigger<"MQTTDeviceConnected">;
  type MessagingDeviceDisconnectedTrigger =
    MakeMessagingDeviceConnectionTrigger<"MQTTDeviceDisconnected">;

  /**
   * Data trigger types
   */

  type DataTriggerTypes =
    | DataCollectionCreatedTrigger
    | DataCollectionUpdatedTrigger
    | DataCollectionDeletedTrigger
    | DataItemCreatedTrigger
    | DataItemUpdatedTrigger
    | DataItemDeletedTrigger;

  type MakeDataTrigger<
    TTriggerAction extends string,
    TTriggerInfo
  > = MakeTrigger<"Data", TTriggerAction, TTriggerInfo>;

  interface CollectionInfo {
    collectionId: string;
    collectionName: string;
  }

  type MakeDataTableTrigger<TTriggerAction extends string> = MakeDataTrigger<
    TTriggerAction,
    CollectionInfo
  >;

  type DataCollectionCreatedTrigger = MakeDataTableTrigger<"CollectionCreated">;
  type DataCollectionUpdatedTrigger = MakeDataTableTrigger<"CollectionUpdated">;
  type DataCollectionDeletedTrigger = MakeDataTableTrigger<"CollectionDeleted">;

  interface DataItemInfo {
    items: Array<{ item_id: string }>;
  }

  type DataItemCreatedTrigger = MakeDataTrigger<
    "ItemCreated",
    CollectionInfo & DataItemInfo
  >;
  type DataItemUpdatedTrigger = MakeDataTrigger<
    "ItemUpdated",
    CollectionInfo & DataItemInfo
  >;
  type DataItemDeletedTrigger = MakeDataTrigger<
    "ItemDeleted",
    CollectionInfo & DataItemInfo
  >;

  /**
   * User trigger types
   */

  type UserTriggerTypes =
    | UserCreatedTrigger
    | UserUpdatedTrigger
    | UserDeletedTrigger;

  type MakeUserTrigger<
    TTriggerAction extends string,
    TTriggerInfo
  > = MakeTrigger<"User", TTriggerAction, TTriggerInfo>;

  type UserCreatedTrigger = MakeUserTrigger<
    "UserCreated",
    {
      user: {
        creation_date: string;
        email: string;
        user_id: string;
      };
    }
  >;

  interface UserUpdatedDeletedInfo {
    user: {
      email: string;
      user_id: string;
    };
    query: TriggerQuery;
  }
  type UserUpdatedTrigger = MakeUserTrigger<
    "UserUpdated",
    UserUpdatedDeletedInfo
  >;
  type UserDeletedTrigger = MakeUserTrigger<
    "UserDeleted",
    UserUpdatedDeletedInfo
  >;

  /**
   * Device trigger types
   */

  type DeviceTriggerTypes = DeviceCreatedTrigger;

  type MakeDeviceTrigger<
    TTriggerAction extends string,
    TTriggerInfo
  > = MakeTrigger<"Device", TTriggerAction, TTriggerInfo>;

  interface DeviceCreatedDeletedInfo {
    device: {
      allow_certificate_auth: boolean;
      allow_key_auth: boolean;
      certificate: string;
      created_date: string;
      description: string;
      device_key: string;
      enabled: boolean;
      last_active_date: string;
      system_key: string;
      type: string;
    };
    deviceName: string;
  }
  type DeviceCreatedTrigger = MakeDeviceTrigger<
    "DeviceCreated",
    DeviceCreatedDeletedInfo
  >;
  type DeviceUpdatedTrigger = MakeDeviceTrigger<
    "DeviceUpdated",
    {
      deviceName: string;
      changes: object;
    }
  >;
  type DeviceDeletedTrigger = MakeDeviceTrigger<
    "DeviceDeleted",
    DeviceCreatedDeletedInfo
  >;

  /**
   * Edge/platform trigger types
   */

  type EdgePlatformTriggerTypes =
    | EdgePlatformPlatformStartedTrigger
    | EdgePlatformPlatformConnectedOnEdgeTrigger
    | EdgePlatformPlatformDisconnectedOnEdgeTrigger
    | EdgePlatformEdgeStartedTrigger
    | EdgePlatformEdgeConnectedOnPlatformTrigger
    | EdgePlatformEdgeDisconnectedOnPlatformTrigger;

  type MakeEdgePlatformTrigger<
    TTriggerAction extends string,
    TTriggerInfo
  > = MakeTrigger<"StartConnectDisconnect", TTriggerAction, TTriggerInfo>;

  type EdgePlatformPlatformStartedTrigger = MakeEdgePlatformTrigger<
    "PlatformStarted",
    {}
  >;

  type EdgePlatformPlatformConnectedOnEdgeTrigger = MakeEdgePlatformTrigger<
    "PlatformConnectedOnEdgeTrigger",
    {}
  >;
  type EdgePlatformPlatformDisconnectedOnEdgeTrigger = MakeEdgePlatformTrigger<
    "PlatformDisconnectedOnEdgeTrigger",
    {}
  >;
  type EdgePlatformEdgeStartedTrigger = MakeEdgePlatformTrigger<
    "EdgeStartedTrigger",
    {}
  >;
  type EdgePlatformEdgeConnectedOnPlatformTrigger = MakeEdgePlatformTrigger<
    "EdgeConnectedOnPlatformTrigger",
    {}
  >;
  type EdgePlatformEdgeDisconnectedOnPlatformTrigger = MakeEdgePlatformTrigger<
    "EdgeDisconnectedOnPlatformTrigger",
    {}
  >;

  /**
   * User Roles trigger types
   */

  type UserRolesTriggerTypes =
    | UserRolesRoleAddedTrigger
    | UserRolesRoleRemovedTrigger;

  type MakeUserRolesTrigger<TTriggerAction extends string> = MakeTrigger<
    "UserRoles",
    TTriggerAction,
    {
      roleID: string;
      roles: string;
      topicPath: string;
      trigger: string;
      userID: string;
    }
  >;

  type UserRolesRoleAddedTrigger = MakeUserRolesTrigger<"UserRoleAdded">;
  type UserRolesRoleRemovedTrigger = MakeUserRolesTrigger<"UserRoleRemoved">;

  interface ProcessEnvOptions {
    uid?: number | undefined;
    gid?: number | undefined;
    cwd?: string | URL | undefined;
    env?: NodeJS.ProcessEnv | undefined;
  }

  type IOType = "overlapped" | "pipe" | "ignore" | "inherit";

  type Stream = import("node:stream").Stream;
  type StdioOptions =
    | IOType
    | Array<IOType | "ipc" | Stream | number | null | undefined>;
  interface CommonOptions extends ProcessEnvOptions {
    windowsHide?: boolean | undefined;
    timeout?: number | undefined;
  }

  interface CommonExecOptions extends CommonOptions {
    input?: string | NodeJS.ArrayBufferView | undefined;
    stdio?: StdioOptions | undefined;
    killSignal?: NodeJS.Signals | number | undefined;
    maxBuffer?: number | undefined;
    encoding?: BufferEncoding | "buffer" | null | undefined;
  }
  interface ExecSyncOptions extends CommonExecOptions {
    shell?: string | undefined;
  }
  interface ExecSyncOptionsWithStringEncoding extends ExecSyncOptions {
    encoding: BufferEncoding;
  }

  interface ChildProcess {
    execSync(command: string): Buffer;
    execSync(
      command: string,
      options: ExecSyncOptionsWithStringEncoding
    ): string | Buffer;
    execSync(command: string, options?: ExecSyncOptions): string | Buffer;
  }
}
