const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/api/items", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post("/api/items", async (req, res) => {
  const { name, price } = req.body;
  const item = await prisma.item.create({
    data: {
      name,
      price,
    },
  });
  res.json(item);
});

app.delete("/api/items/:id", async (req, res) => {
  const itemId = parseInt(req.params.id);
  await prisma.item.delete({
    where: {
      id: itemId,
    },
  });
  res.json({ message: "Item deletado" });
});

app.listen(5000, () => {
  console.log("Server está rodando na porta 5000. É os guri");
});