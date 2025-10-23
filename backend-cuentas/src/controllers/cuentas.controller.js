import cuentas from "../data/cuentas.json" assert { type: "json" };

const norm = (s) => String(s ?? "").trim().toLowerCase();

export const listarCuentas = (req, res) => {
  res.json({ count: cuentas.length, data: cuentas });
};

export const obtenerCuentaPorId = (req, res) => {
  const { id } = req.params;
  const account = cuentas.find((c) => c._id === id) || null;
  res.json({ finded: Boolean(account), account });
};

export const buscarCuentas = (req, res) => {
  const { id, name, gender, q } = req.query;
  let results = cuentas;

  if (id) results = results.filter((c) => norm(c._id).includes(norm(id)));
  if (name) results = results.filter((c) => norm(c.client).includes(norm(name)));
  if (gender) results = results.filter((c) => norm(c.gender) === norm(gender));

  if (q && !id && !name && !gender) {
    const s = norm(q);
    results = results.filter(
      (c) => norm(c._id).includes(s) || norm(c.client).includes(s) || norm(c.gender).includes(s)
    );
  }

  if (results.length === 0) return res.json({ finded: false });
  if (results.length === 1) return res.json({ finded: true, account: results[0] });
  return res.json({ finded: true, data: results });
};

export const cuentasBalance = (req, res) => {

  const activas = cuentas.filter(c => c.isActive === true);


  const status = activas.length > 0;


  const accountBalance = activas.reduce(
    (acc, c) => acc + Number(c.balance || 0),
    0
  );

 
  return res.json({ status, accountBalance });
};
