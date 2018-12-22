const mongoose = require('mongoose')

const schema = {
    organization_name: {type: String, index:1, required: true},
    association_manager: {type: String, required: true},
    year: {type: Number, required: true},
    number_of_athletes: {type: Number, required: true},
    money_paid: {type: Number, required: true},
    financial_expanses:[{
        expanse:{type:Number, required:true},
        field:{type:String, required:true}
        }]
   
}

const sport_association_schema = new mongoose.Schema(schema);
const sport_association = mongoose.model('financial_management_association', sport_association_schema);

module.exports = sport_association;