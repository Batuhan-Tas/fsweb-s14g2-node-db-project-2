const carModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const checkExistCar = await carModel.getById(req.params.id);
    if (!checkExistCar) {
      res
        .status(404)
        .json({ message: `${req.params.id} kimliğine sahip araba bulunamadı` });
    } else {
      req.existCar = checkExistCar;
      next();
    }
  } catch (error) {}
};

const checkCarPayload = (req, res, next) => {
  try {
    const allFields = ["vin", "make", "model", "mileage"];
    const missingFields = [];
    for (let i in allFields) {
      const item = allFields[i];
      if (!req.body[item]) {
        missingFields.push(item);
      }
    }

    if (missingFields.length > 0) {
      res.status(400).json({
        message: `${missingFields.toString()} ${
          missingFields.length == 1 ? "is" : "are"
        } missing`,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  try {
    let isValidVin = vinValidator.validate(req.body.vin);
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    let isExistVin = await carModel.getVin(req.body.vin);
    if (isExistVin) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
