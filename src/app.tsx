import express from "express";

import bodyParser from "body-parser";

import cors from "cors";

import usersRoutes from "./routes/users.route";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/api/users", usersRoutes);

app.listen(4000);
