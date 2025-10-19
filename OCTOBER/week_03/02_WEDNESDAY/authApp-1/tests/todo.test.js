// tests/todos.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = require("../server");
const UserModel = require("../models/user.model");
const TodoModel = require("../models/todo.model");

let userToken, otherUserToken;
let todoId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Create test user with hashed password
  const hashedPassword1 = await bcrypt.hash("password123", 10);
  const user = await UserModel.create({
    username: "user1",
    email: "user1@example.com",
    password: hashedPassword1,
  });
  userToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

  // Create another user
  const hashedPassword2 = await bcrypt.hash("password123", 10);
  const otherUser = await UserModel.create({
    username: "user2",
    email: "user2@example.com",
    password: hashedPassword2,
  });
  otherUserToken = jwt.sign({ userId: otherUser._id }, process.env.JWT_SECRET_KEY);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Todos Integration Tests", () => {

  it("should create a todo for logged-in user", async () => {
    const res = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${userToken}`)
      .send({ title: "My Todo", status: false });

    expect(res.statusCode).toBe(201); // 201 for creation
    expect(res.body).toHaveProperty("todo");
    expect(res.body.todo.title).toBe("My Todo");

    todoId = res.body.todo._id;
  });

  it("should get todos for logged-in user", async () => {
    const res = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.todos)).toBe(true);
    expect(res.body.todos.length).toBeGreaterThanOrEqual(1);
  });

  it("should update a todo by owner", async () => {
    const res = await request(app)
      .put(`/todos/${todoId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ status: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.todo.status).toBe(true);
  });

  it("should delete a todo by owner", async () => {
    const res = await request(app)
      .delete(`/todos/${todoId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Todo deleted successfully");
  });

  it("should reject access without token", async () => {
    const res = await request(app).get("/todos");
    expect(res.statusCode).toBe(401); // Unauthorized
    expect(res.body.error).toBeDefined();
  });

  it("should not allow a user to update another user's todo", async () => {
    // Create a todo with user1
    const newTodo = await TodoModel.create({
      title: "Owner Todo",
      userId: new mongoose.Types.ObjectId(jwt.decode(userToken).userId),
    });

    const res = await request(app)
      .put(`/todos/${newTodo._id}`)
      .set("Authorization", `Bearer ${otherUserToken}`)
      .send({ status: true });

    expect(res.statusCode).toBe(403); // Forbidden
  });

  it("should not allow a user to delete another user's todo", async () => {
    // Create another todo for user1
    const newTodo = await TodoModel.create({
      title: "Owner Todo 2",
      userId: new mongoose.Types.ObjectId(jwt.decode(userToken).userId),
    });

    const res = await request(app)
      .delete(`/todos/${newTodo._id}`)
      .set("Authorization", `Bearer ${otherUserToken}`);

    expect(res.statusCode).toBe(403); // Forbidden
  });
});
