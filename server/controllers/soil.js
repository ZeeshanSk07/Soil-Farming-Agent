const Soil = require("../model/soil");

function postSoil() {
  return async (req, res, next) => {
    try {
      const { name, color, characteristics, suitable_crops } = req.body;

      const newSoil = new Soil({
        name,
        color,
        characteristics,
        suitable_crops,
      });
      await newSoil.save();

      res
        .status(201)
        .json({ message: "Soil added successfully", soil: newSoil });
    } catch (error) {
      next("Error posting soil details", error);
    }
  };
}

function getsoil_details(){
    return async (req,res,next)=>{
        try{
            const soil = await Soil.findById(req.params.id);
            if(!soil){
                return res.status(404).json({message: "Soil not found"});
            }
            res.json(soil);
        }catch(error){
            next("Error getting soil details", error);
        }
    }
}

function getallDetails (){
    return async (req,res,next)=>{
        try{
            const soils = await Soil.find();
            res.json(soils);
        }catch(error){
            next("Error getting all soil details", error);
        }
    }
}

function updatesoilDetails(){
    return async (req,res,next)=>{
        try{
            const {name, color, characteristics, suitable_crops} = req.body;
            const id = req.params.id;

            const soil = await Soil.findByIdAndUpdate(id,{name, color, characteristics, suitable_crops})
            await soil.save();
            if(!soil){
                return res.status(404).json({message: "Soil not found"});
            }
            return res.json({
                message: "Soil updated successfully",
                soil: soil
            })
        }catch(error){
            next("Error updating soil details", error);
        }
    }
}

function deleteDetails(){
    return async (req,res,next)=>{
        try{
            const id = req.params.id;
            const soil = await Soil.findByIdAndDelete(id);
            if(!soil){
                return res.status(404).json({message: "Soil not found"});
            }
            res.json({message: "Soil deleted successfully", soil})
        }catch(error){
            next("Error deleting soil details", error);
        }
    }
}

module.exports = {postSoil, getsoil_details, getallDetails, updatesoilDetails, deleteDetails}