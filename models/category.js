import mongoose from 'mongoose';

const cateSchema = mongoose.Schema({
    cateName : {
        type : String,
        strim : true,
        maxLength : 100,
        required : true,
    },
    image : {
        type  : String,
        required : true
    }
}, { timestamps : true }
)

module.exports = mongoose.model('Categories', cateSchema)