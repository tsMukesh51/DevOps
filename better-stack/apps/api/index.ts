import Express from "express";
import prismaClient from "@repo/db";

const app = Express();
app.use(Express.json());

app.get("/", async (req, res) => {

  const creatUsers = await prismaClient.user.create({
    data: {
      name: "Mukesh",
      email: "mukesh@email.com",
      password: "pa$sw0Rd",
    }
  });

  const users = await prismaClient.user.findMany({});
  res.json({
    message: "Namaste World",
    data: users,
  });
});

app.listen(process.env.port || 3000);