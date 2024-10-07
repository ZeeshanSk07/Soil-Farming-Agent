const Soil = require("../model/soil");

// POST: Add new soil entry
function postSoil() {
  return async (req, res, next) => {
    try {
      console.log('Request received', req.body);
      const { name, color, characteristics, suitable_crops, distributor } = req.body;

      const newSoil = new Soil({
        name,
        color,
        characteristics,
        suitable_crops,
        distributor
      });

      await newSoil.save();

      res.status(201).json({
        message: "Soil added successfully",
        soil: newSoil
      });
    } catch (error) {
      console.log("Error posting soil details", error);
      next(error); 
    }
  };
}

// GET: Get details of a specific soil entry
function getsoil_details() {
  return async (req, res, next) => {
    try {
      const soil = await Soil.findById(req.params.id);
      if (!soil) {
        return res.status(404).json({ message: "Soil not found" });
      }
      res.json(soil);
    } catch (error) {
      console.log("Error getting soil details", error);
      next(error);
    }
  };
}

// GET: Get all soil entries
function getallDetails() {
  return async (req, res, next) => {
    try {
      const soils = await Soil.find();
      res.json(soils);
    } catch (error) {
      console.log("Error getting all soil details", error);
      next(error);
    }
  };
}

// PUT: Update soil details
function updatesoilDetails() {
  return async (req, res, next) => {
    try {
      const { name, color, characteristics, suitable_crops, distributor } = req.body;
      const id = req.params.id;

      const soil = await Soil.findByIdAndUpdate(id, {
        name,
        color,
        characteristics,
        suitable_crops,
        distributor
      }, { new: true });

      if (!soil) {
        return res.status(404).json({ message: "Soil not found" });
      }

      return res.json({
        message: "Soil updated successfully",
        soil: soil
      });
    } catch (error) {
      console.log("Error updating soil details", error);
      next(error);
    }
  };
}

// DELETE: Remove a soil entry
function deleteDetails() {
  return async (req, res, next) => {
    try {
      const id = req.params.id;
      const soil = await Soil.findByIdAndDelete(id);

      if (!soil) {
        return res.status(404).json({ message: "Soil not found" });
      }

      res.json({
        message: "Soil deleted successfully",
        soil
      });
    } catch (error) {
      console.log("Error deleting soil details", error);
      next(error);
    }
  };
}

module.exports = {
  postSoil,
  getsoil_details,
  getallDetails,
  updatesoilDetails,
  deleteDetails
};
