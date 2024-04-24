import express from "express";
import connectMongoDB from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createFakeUser } from "./seeders/seed.js";
import {
  createGroupChats,
  createMessagesInAChat,
  createSingleChats,
} from "./seeders/chat.js";
// import {createGroupChats,createMessages, createMessagesInAChat, createSingleChats} from './seeders/chat.js'
dotenv.config();

const PORT = process.env.PORT || 9999;
const app = express();

connectMongoDB();
// createFakeUser(15);
// createSingleChats(10);
// createGroupChats(10);
// createMessagesInAChat('66200f2d463dab2068cc18eb', 50)
app.use(
  cors({
    origin: "*",
    credential: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/v1", (req, res) => {
  res.json({ message: "Server is working fine on api/v1" });
});
app.get("/", (req, res) => {
  res.json({ message: "Server is working fine on root" });
});
import user from "./routes/user.js";
app.use("/api/v1/user", user);
//caht
import chat from "./routes/chat.js";
app.use("/api/v1/chat", chat);

//admin
import admin from "./routes/admin.js";
app.use("/api/v1/admin", admin);

app.listen(PORT, () => [console.log(`Server running on port ${PORT}`)]);
