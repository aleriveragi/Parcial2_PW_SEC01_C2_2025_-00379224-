import express from "express";
import cors from "cors";
import cuentasRouter from "./routes/cuentas.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", cuentasRouter);

const PORT = 3130;
app.listen(PORT, () => {
  console.log(`✅ API de Cuentas escuchando en http://localhost:${PORT}`);
});
