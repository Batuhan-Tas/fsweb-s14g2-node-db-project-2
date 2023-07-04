/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const defaultCars = [
  {
    vin: "123",
    make: "Honda",
    model: "Civic",
    mileage: "43500",
    transmission: "Automatic",
  },
  {
    vin: "345",
    make: "BMW",
    model: "3.20i",
    mileage: "120000",
    transmission: "Automatic",
  },
  {
    vin: "567",
    make: "Mercedes-Benz",
    model: "C180",
    mileage: "78000",
    transmission: "Automatic",
  },
  {
    vin: "789",
    make: "Renault",
    model: "Broadway",
    mileage: "180000",
    transmission: "Manual",
  },
];
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("cars").truncate();
  await knex("cars").insert(defaultCars);
};
