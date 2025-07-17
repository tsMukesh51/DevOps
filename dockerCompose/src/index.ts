import Express from "express";
import { PrismaClient } from "./generated/prisma";
// import { PrismaClient } from "@prisma/client";


const app = Express();
const prismaClient = new PrismaClient();
// app.use(Express.json);

app.post("/user", async (req, res) => {
    const userCreated = await prismaClient.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }
    });
    res.json({
        user: userCreated,
        message: "User Created Successfully",
    });
});

app.get("/userslist", async (req, res) => {
    const usersList = await prismaClient.user.findMany({});
    res.json({
        usersList: usersList,
        message: "User list fetched successful",
    })
});

app.listen(3000);
