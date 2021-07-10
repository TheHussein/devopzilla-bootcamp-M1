const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");
// Models
const Item = require("../models/item.model");
const Order = require("../models/order.model");

// Drop the test database before running the tests
beforeAll(async () => await mongoose.connection.dropDatabase());

// Drop the test database after each test
afterEach(async () => await mongoose.connection.dropDatabase());

test("GET /item/list", async () => {
  const item = await Item.create({
    name: "Item1",
    cost: 66,
    available_quantity: 6,
  });

  await supertest(app)
    .get("/item/list")
    .expect(200)
    .then(async (response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(item.id);
      expect(response.body[0].name).toBe(item.name);
      expect(response.body[0].cost).toBe(item.cost);
      expect(response.body[0].available_quantity).toBe(item.available_quantity);
    });
});

test("POST /item/create", async () => {
  const data = { name: "Item1", cost: 66, available_quantity: 6 };

  await supertest(app)
    .post("/item/create")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(data.name);
      expect(response.body.cost).toBe(data.cost);
      expect(response.body.available_quantity).toBe(data.available_quantity);

      // Check data in the database
      const item = await Item.findOne({ _id: response.body._id });
      expect(item).toBeTruthy();
      expect(item.name).toBe(data.name);
      expect(item.cost).toBe(data.cost);
      expect(item.available_quantity).toBe(data.available_quantity);
    });
});

test("PUT /item/:id", async () => {
  const item = await Item.create({
    name: "Item1",
    cost: 66,
    available_quantity: 6,
  });

  const data = { name: "Item1NewName", cost: 77, available_quantity: 7 };

  await supertest(app)
    .put("/item/" + item.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body.item._id).toBe(item.id);
      expect(response.body.item.name).toBe(data.name);
      expect(response.body.item.cost).toBe(data.cost);
      expect(response.body.item.available_quantity).toBe(
        data.available_quantity
      );

      // Check the data in the database
      const newItem = await Item.findOne({ _id: response.body.item._id });
      expect(newItem).toBeTruthy();
      expect(newItem.name).toBe(data.name);
      expect(newItem.cost).toBe(data.cost);
      expect(newItem.available_quantity).toBe(data.available_quantity);
    });
});

test("DELETE /item/:id", async () => {
  const item = await Item.create({
    name: "Item1",
    cost: 66,
    available_quantity: 6,
  });

  await supertest(app)
    .delete("/item/" + item.id)
    .expect(200)
    .then(async () => {
      expect(await Item.findOne({ _id: item.id })).toBeFalsy();
    });
});

test("GET /order/list", async () => {
  const order = await Order.create({
    item_id: "60e9bc7fa52f951849e45dec",
    requested_quantity: 6,
    total_cost: 66,
  });

  await supertest(app)
    .get("/order/list")
    .expect(200)
    .then(async (response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0]._id).toBe(order.id);
      expect(response.body[0].item_id).toStrictEqual(order.item_id);
      expect(response.body[0].requested_quantity).toBe(
        order.requested_quantity
      );
      expect(response.body[0].total_cost).toBe(order.total_cost);
    });
});

test("POST /order/create", async () => {
  const data = {
    item_id: "60e9bc7fa52f951849e45dec",
    requested_quantity: 6,
    total_cost: 66,
  };

  await supertest(app)
    .post("/order/create")
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body._id).toBeTruthy();
      expect(response.body.item_id).toBe(data.item_id);
      expect(response.body.requested_quantity).toBe(data.requested_quantity);
      expect(response.body.total_cost).toBe(data.total_cost);

      // Check data in the database
      const order = await Order.findOne({ _id: response.body._id });
      expect(order).toBeTruthy();
      expect(order.item_id).toBe(data.item_id);
      expect(order.requested_quantity).toBe(data.requested_quantity);
      expect(order.total_cost).toBe(data.total_cost);
    });
});

test("PUT /order/:id", async () => {
  const order = await Order.create({
    item_id: "60e9bc7fa52f951849e45dec",
    requested_quantity: 6,
    total_cost: 66,
  });

  const data = {
    item_id: "60e9f438a52f951849e45dfc",
    requested_quantity: 7,
    total_cost: 77,
  };

  await supertest(app)
    .put("/order/" + order.id)
    .send(data)
    .expect(200)
    .then(async (response) => {
      // Check the response
      expect(response.body.order._id).toBe(order.id);
      expect(response.body.order.item_id).toBe(data.item_id);
      expect(response.body.order.requested_quantity).toBe(
        data.requested_quantity
      );
      expect(response.body.order.total_cost).toBe(data.total_cost);

      // Check the data in the database
      const newOrder = await Order.findOne({ _id: response.body.order._id });
      expect(newOrder).toBeTruthy();
      expect(newOrder.item_id).toBe(data.item_id);
      expect(newOrder.requested_quantity).toBe(data.requested_quantity);
      expect(newOrder.total_cost).toBe(data.total_cost);
    });
});

test("DELETE /order/:id", async () => {
  const order = await Order.create({
    item_id: "60e9bc7fa52f951849e45dec",
    requested_quantity: 6,
    total_cost: 66,
  });

  await supertest(app)
    .delete("/order/" + order.id)
    .expect(200)
    .then(async () => {
      expect(await Order.findOne({ _id: order.id })).toBeFalsy();
    });
});
