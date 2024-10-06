const mongoose = require('mongoose');

const soilschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color : {
        type: String,
        required: true
    },
    characteristics:{
        type: Object,
        required: true
    },
    suitable_crops:{
        type: Object,
        required: true
    }

});

module.exports = mongoose.model('Soil', soilschema);