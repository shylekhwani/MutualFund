import express from "express";
import { PORT } from "./src/config/serverConfig.js";
import connectDB from "./src/config/dbConfig.js";
import apiRouter from "./src/routes/apiRouter.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server",
    source: "From Custom err handle middlewear",
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
