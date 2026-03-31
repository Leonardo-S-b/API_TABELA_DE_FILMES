import express from "express";
import { filmesRouter } from "./Routes/Filmes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/filmes", filmesRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
