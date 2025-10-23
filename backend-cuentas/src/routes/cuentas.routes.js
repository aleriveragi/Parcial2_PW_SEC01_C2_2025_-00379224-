import { Router } from "express";
import { listarCuentas, obtenerCuentaPorId, buscarCuentas, cuentasBalance } from "../controllers/cuentas.controller.js";

const router = Router();

router.get("/cuentas", (req, res) => {
  if (Object.keys(req.query).length > 0) return buscarCuentas(req, res);
  return listarCuentas(req, res);
});

router.get("/cuenta/:id", obtenerCuentaPorId);

router.get("/cuentasBalance", cuentasBalance);

export default router;
