// tests/auth.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = require("../server");
const UserModel = require("../models/user.model");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_TEST_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("Auth Integration Tests", () => {
    const userData = {
        username: "rohit",
        email: "rohit@example.com",
        password: "password123",
    };

    let token;

    it("should signup successfully", async () => {
        const res = await request(app).post("/signup").send(userData);

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Signup Success");
        expect(res.body.userId).toBeDefined();

        const userInDB = await UserModel.findOne({ email: userData.email });
        expect(userInDB).toBeTruthy();
        expect(await bcrypt.compare(userData.password, userInDB.password)).toBe(true);
    });

    it("should not signup with an existing email", async () => {
        const res = await request(app).post("/signup").send(userData);

        expect(res.statusCode).toBe(409);
        expect(res.body.message).toBe("User already exists, please login");
    });

    it("should fail signup when fields are missing", async () => {
        const res = await request(app).post("/signup").send({ email: "test@example.com" });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("All fields are required");
    });
 
    it("should login successfully and receive a JWT", async () => {
        const res = await request(app).post("/login").send({
            email: userData.email,
            password: userData.password,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Login Success");
        expect(res.body.token).toBeDefined();

        const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET_KEY);
        expect(decoded.userId).toBeDefined();
        expect(decoded.email).toBe(userData.email);

        token = res.body.token;
    });

    it("should fail login with wrong password", async () => {
        const res = await request(app).post("/login").send({
            email: userData.email,
            password: "wrongpassword",
        });

        expect(res.statusCode).toBe(403);
        expect(res.body.message).toBe("Wrong password");
    });

    it("should fail login for non-existing user", async () => {
        const res = await request(app).post("/login").send({
            email: "nonexistent@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("User not found, please signup");
    });

  
});
