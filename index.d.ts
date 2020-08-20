// Custom Type definitions for non-npm package clearbladejs-server
// Project: https://github.com/ClearBlade/native-libraries/blob/master/clearblade.md
// Definitions by: Jim Bouquet <https://github.com/ClearBlade>
//                 Clark Bynum <https://github.com/ClearBlade>
// Minimum TypeScript Version: 3.0
declare namespace CbServer {
  interface BasicReq<
    T = {
      [id: string]: unknown;
    }
    > {
    readonly isLogging: boolean;
    readonly params: T & { trigger?: string; query?: Query };
    readonly systemKey: string;
    readonly systemSecret: string;
    readonly userEmail: string;
    readonly userToken: string;
    readonly userid: string;
    readonly service_instance_id: string;
  }
  type ReqTypes = BasicReq;
  let req: ReqTypes;
  interface Resp {
    error(msg: unknown): never;
    success(msg: unknown): never;
    send(msg: unknown): never;
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
  type CbCallback<T = Resp> = (error: boolean, response: T) => void;
  interface ClearBladeGlobal extends ClearBladeInt {
    user: APIUser;
  }
  interface ClearBladeInt {
    URI: string;
    Trigger: TriggerClass;
    Timer: TimerClass;
    about(): string;
    addToQuery(queryObj: QueryObj, key: string, value: string): void;
    addFilterToQuery(
      queryObj: QueryObj,
      condition: QueryConditions,
      key: string,
      value: QueryValue
    ): void;
    addSortToQuery(
      queryObj: QueryObj,
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
    ): QueryObj;
    parseOperationQuery(query: Query): string;
    parseQuery(query: Query | QueryObj): string;
    registerUser(email: string, password: string, callback: CbCallback): void;
    setUser(email: string, authToken: string, userId: string): void;
    User(): AppUser;
    Cache(name: string): Cache;
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
  type CollectionFetchData<T extends {} = {}> = T & {
    DATA: Array<CollectionSchema<T>>;
    CURRENTPAGE: number;
    NEXTPAGEURL: string | null;
    PREVPAGEURL: string | null;
    TOTAL: number;
  };
  interface Collection<T extends object> {
    user: APIUser;
    URI: string;
    systemKey: string;
    systemSecret: string;
    addColumn(options: object, callback: CbCallback): void;
    dropColumn(name: string, callback: CbCallback): void;
    deleteCollection(callback: CbCallback): void;
    fetch(query: QueryObj, callback: CbCallback<CollectionFetchData<T>>): void;
    fetch(callback: CbCallback<CollectionFetchData<T>>): void;
    create(
      newItem: Partial<T> | Array<Partial<T>>,
      callback: CbCallback<CollectionSchema[]>
    ): void;
    update(
      query: QueryObj,
      changes: object,
      callback: CbCallback<"success">
    ): void;
    remove(query: QueryObj, callback: CbCallback): void;
    columns(callback: CbCallback): void;
    count(query: QueryObj, callback: CbCallback): void;
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
  type QueryValue = string | number | boolean | Date;
  interface QueryOptions {
    offset?: number;
    limit?: number;
  }
  interface QueryOptionsWithCollection
    extends CollectionOptionsWithCollection,
    QueryOptions { }
  interface QueryOptionsWithName
    extends CollectionOptionsWithName,
    QueryOptions { }
  interface QueryOptionsWithID extends CollectionOptionsWithID, QueryOptions { }
  interface Query {
    SELECTCOLUMNS?: string[];
    SORT?: QuerySortDirections;
    FILTERS?: QueryFilter[][];
    PAGESIZE?: number;
    PAGENUM?: number;
  }
  type QueryFilter = {
    [key in QueryConditions]?: Array<Record<string, QueryValue>>;
  };
  interface QueryObj {
    id: string;
    user: APIUser;
    URI: string;
    systemKey: string;
    systemSecret: string;
    query: Query;
    OR: Query[];
    offset: number;
    limit: number;
    ascending(field: string): QueryObj;
    descending(field: string): QueryObj;
    equalTo(field: string, value: QueryValue): QueryObj;
    greaterThan(field: string, value: QueryValue): QueryObj;
    greaterThanEqualTo(field: string, value: QueryValue): QueryObj;
    lessThan(field: string, value: QueryValue): QueryObj;
    lessThanEqualTo(field: string, value: QueryValue): QueryObj;
    notEqualTo(field: string, value: QueryValue): QueryObj;
    matches(field: string, pattern: QueryValue): QueryObj;
    or(query: QueryObj): QueryObj;
    setPage(pageSize: number, pageNum: number): QueryObj;
    fetch<T = {}>(callback: CbCallback<CollectionFetchData<T>>): QueryObj;
    update(changes: object, callback: CbCallback): QueryObj;
    columns(columnsArray: string[]): QueryObj;
    remove(callback: CbCallback): QueryObj;
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
  interface DeploymentOptions { }
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
    readAll(query: QueryObj, callback: CbCallback): void;
  }
  interface AppUser {
    user: APIUser;
    URI: string;
    systemKey: string;
    systemSecret: string;
    getUser(callback: CbCallback): void;
    setUser(data: object, callback: CbCallback): void;
    setUsers(query: QueryObj, data: object, callback: CbCallback): void;
    allUsers<T>(query: QueryObj, callback: CbCallback<T>): void;
    count(query: QueryObj, callback: CbCallback): void;
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
  interface MessagingOptions { }
  interface Device {
    URI: string;
    systemKey: string;
    systemSecret: string;
    fetch(query: Query, callback: CbCallback): void;
    update(query: Query, changes: object, callback: CbCallback): void;
    delete(query: Query, callback: CbCallback): void;
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
    start_time?: Date;
    repeats?: number;
    frequency?: number;
    service_name?: string;
    user_id?: string;
    user_token?: string;
  }
  interface TimerClass {
    Create(
      name: string,
      options: TimerCreateOptions,
      callback: CbCallback
    ): void;
    Fetch(name: string, callback: CbCallback): void;
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
    Update(options: object, callback: CbCallback): void;
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
}

// eslint-disable-next-line no-var
declare var ClearBlade: CbServer.ClearBladeGlobal;
