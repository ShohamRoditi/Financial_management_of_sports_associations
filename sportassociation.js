const mongoose = require('mongoose')

const schema = {
    organization_name: {type: String, index:1, required: true},
    association_manager: {type: String, required: true},
    year: {type: Number, required: true},
    number_of_athletes: {type: Number, required: true},
    money_paid: {type: Number, required: true},
    // financial_expanses:{type: JSON, required:true}, // check if it is ok to write type json in this way 
    // expanse:{type:Number, required:true},
    // field:{type:String, required:true}
    financial_expanses:[{
        expanse:{type:Number, required:true},
        field:{type:String, required:true}
        }]
   
}

const sport_association_schema = new mongoose.Schema(schema);
//  sport_association_schema.path('associationsyear').validate(
//      (val) => {
//      console.log(` The year is : ${val}`);
//     // if( val == '1999' || '1998' || '1997' || '1996' || '2003')
//     //     return val;

//  }, "There is not exist this year ");
const sport_association = mongoose.model('financial_management_association', sport_association_schema);

module.exports = sport_association;