const db = require("../../data/db-config");

const getAll = () => {
  return db("cars");
};

const getById = (carId) => {
  return db("cars").where("id", carId).first();
};

const create = async (carEntity) => {
  const [id] = await db("cars").insert(carEntity);
  return getById(id);
};

const getVin = async (vin) => {
  return db("cars").where("vin", vin).first();
};

module.exports = {
  getAll,
  getById,
  create,
  getVin,
};
