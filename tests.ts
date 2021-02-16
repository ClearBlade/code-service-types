// Testing type definitions for clearbladejs-server 1.0
// Project: https://github.com/ClearBlade/JavaScript-API
// Definitions by: Jim Bouquet <https://github.com/ClearBlade>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

const genericCallback = (error: boolean, response: unknown) => {};

///////////////////////////////////////
// ClearBlade object API invocations
///////////////////////////////////////
ClearBlade.init({
  systemKey: "abcdef",
  systemSecret: "abcdefg",
  callback: genericCallback,
});

const req: CbServer.BasicReq<{ param1: string; param2: number }> = {
  isLogging: false,
  params: {
    param1: "1",
    param2: 2,
  },
  systemKey: "abcdef",
  systemSecret: "abcdef",
  userEmail: "test@test.com",
  userToken: "abcdef",
  userid: "abcdef",
  service_instance_id: "abcdef",
};

ClearBlade.init({
  request: req,
});

const about = ClearBlade.about();
ClearBlade.setUser("test@test.com", "authtoken", "userId");
ClearBlade.registerUser("test@test.com", "password", genericCallback);
ClearBlade.isCurrentUserAuthenticated(genericCallback);
ClearBlade.logoutUser(genericCallback);
ClearBlade.loginAnon(genericCallback);
ClearBlade.loginUser("test@test.com", "password", genericCallback);

ClearBlade.getAllCollections(genericCallback);
const edgeID = ClearBlade.edgeId();
const isEdge = ClearBlade.isEdge();
if (ClearBlade.isObjectEmpty({ test: "test" })) {
  ClearBlade.logger("Object is empty");
}
const kvPair = ClearBlade.makeKVPair("key", "value");

const coll1 = ClearBlade.Collection("collectionID");
const coll2 = ClearBlade.Collection({ collectionName: "collectionName" });
const coll3 = ClearBlade.Collection({ collectionID: "collectionID" });
const coll4 = ClearBlade.Collection({ collection: "collectionID" });

const query1 = ClearBlade.Query({ collectionID: "collectionID" });
const query2 = ClearBlade.Query({ collectionName: "collectionName" });
const query3 = ClearBlade.Query({ collection: "collectionID" });

const item1 = ClearBlade.Item({}, "collectionID");
const item2 = ClearBlade.Item({}, { collectionID: "collectionID" });

const code = ClearBlade.Code();
const deployment = ClearBlade.Deployment();
const user = ClearBlade.User();

const messaging = ClearBlade.Messaging({}, genericCallback);

const device = ClearBlade.Device();

ClearBlade.addToQuery(query1, "key", "value");
ClearBlade.addSortToQuery(
  query1,
  CbServer.QuerySortDirections.QUERY_SORT_ASCENDING,
  "column1"
);
ClearBlade.addFilterToQuery(
  query1,
  CbServer.QueryConditions.QUERY_GREATERTHAN,
  "key",
  "value"
);

ClearBlade.newCollection("collectionName", genericCallback);

ClearBlade.createDevice(
  "devicename",
  { type: "devicetype" },
  false,
  genericCallback
);
ClearBlade.deleteDevice("devicename", true, genericCallback);
ClearBlade.updateDevice(
  "devicename",
  { type: "devicetype" },
  true,
  genericCallback
);
ClearBlade.getDeviceByName("devicename", genericCallback);
ClearBlade.getAllDevicesForSystem(genericCallback);
ClearBlade.validateEmailPassword("test@test.com", "password");

///////////////////////////////////////
// Collection API invocations
///////////////////////////////////////

const successCallback = (error: boolean, response: string) => {};
const fetchCallback = (
  error: boolean,
  data: CbServer.CollectionFetchData
) => {};
const createCallback = (
  error: boolean,
  response: CbServer.CollectionSchema[]
) => {};

coll1.addColumn({ name: "column1" }, genericCallback);
coll1.dropColumn("column1", genericCallback);
coll1.deleteCollection(genericCallback);
coll1.fetch(query1, fetchCallback);
coll1.create(ClearBlade.Item({}, "").data, createCallback);
coll1.update(query1, {}, successCallback);
coll1.remove(query1, genericCallback);
coll1.columns(genericCallback);
coll1.count(query1, genericCallback);

///////////////////////////////////////
// Query API invocations
///////////////////////////////////////
query2.ascending("string");
query1.descending("string");
query1.equalTo("string", "string");
query1.greaterThan("string", 2);
query1.greaterThanEqualTo("string", false);
query1.lessThan("string", "string");
query1.lessThanEqualTo("string", "string");
query1.notEqualTo("string", "string");
query1.matches("string", ".*");
query1.or(query2);
query1.setPage(1, 1);
query1.fetch((err: boolean, resp: CbServer.CollectionFetchData) => undefined);
query1.update({}, genericCallback);
query1.columns([]);
query1.remove(genericCallback);

///////////////////////////////////////
// Item API invocations
///////////////////////////////////////
item1.save();
item1.refresh();
item1.destroy();

///////////////////////////////////////
// Code API invocations
///////////////////////////////////////
code.execute("codeName", {}, true, genericCallback);
code.getAllServices(genericCallback);

///////////////////////////////////////
// Deployment API invocations
///////////////////////////////////////
deployment.create(
  "deploymentname",
  "deployment description",
  {},
  genericCallback
);
deployment.update("deploymentname", {}, genericCallback);
deployment.delete("deploymentname", genericCallback);
deployment.read("deploymentname", genericCallback);
deployment.readAll(query1, genericCallback);

///////////////////////////////////////
// User API invocations
///////////////////////////////////////
user.getUser(genericCallback);
user.setUser({}, genericCallback);
user.setUsers(query2, { name: "Fred" }, genericCallback);
user.allUsers(query1, genericCallback);
user.count(query1, genericCallback);

///////////////////////////////////////
// Messaging API invocations
///////////////////////////////////////
messaging.getMessageHistoryWithTimeFrame(
  "topic",
  5,
  10,
  15,
  20,
  genericCallback
);
messaging.getMessageHistory("topic", 5, 15, genericCallback);
messaging.getAndDeleteMessageHistory("topic", 5, 10, 1, 20, genericCallback);
messaging.getCurrentTopics(genericCallback);
messaging.publish("topic", "payload");

///////////////////////////////////////
// Device API invocations
///////////////////////////////////////
device.fetch(query1, genericCallback);
device.update(query1, { object: Object }, genericCallback);
device.delete(query1, genericCallback);
device.create({ newDevice: Object }, genericCallback);

///////////////////////////////////////
// Triggers API invocations
///////////////////////////////////////
ClearBlade.Trigger.Create(
  "triggername",
  {
    system_key: "key",
    name: "triggername",
    def_module: CbServer.TriggerModule.DEVICE,
    def_name: "someName",
    key_value_pairs: [],
    service_name: "ServiceName",
  },
  genericCallback
);
ClearBlade.Trigger.Fetch("triggername", genericCallback);

///////////////////////////////////////
// Timers API invocations
///////////////////////////////////////
ClearBlade.Timer.Create(
  "timername",
  {
    service_name: "",
    frequency: 600,
    repeats: -1,
    start_time: "2021-02-05T17:28:58.587Z",
  },
  genericCallback
);
ClearBlade.Timer.Fetch("timername", genericCallback);

///////////////////////////////////////
// Resp API
///////////////////////////////////////
const customResponseCallBack = (
  req: CbServer.BasicReq,
  resp: CbServer.Resp
) => {
  resp.send({ custom: "response" });
};

const statusCodeCallBack = (req: CbServer.BasicReq, resp: CbServer.Resp) => {
  resp.status(200);
};

const setHeaderCallBack = (req: CbServer.BasicReq, resp: CbServer.Resp) => {
  resp.set({ headerA: "value" });
};

declare var ClearBlade: CbServer.ClearBladeGlobal;
