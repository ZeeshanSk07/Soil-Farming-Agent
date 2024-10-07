const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: (true,'Username required')
    },
    password:{
        type: String,
        required: (true,'Password required')
    }
})
module.exports = mongoose.model('Admin', adminSchema);