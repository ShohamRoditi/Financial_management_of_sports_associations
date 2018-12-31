const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
const consts = require('./consts');
const sportassociation = require('./sportassociation');


const {MLAB_URL, DB_USER, DB_PASS} = consts;
const url = MLAB_URL;
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    user: DB_USER,
    pass: DB_PASS
}

mongoose.connect(url, options)
.then(
    () => {
        console.log("Connected");
    },
    err => {
        console.log(`Connection Error ${err}`);
    }
);


module.exports = {
    //Query number 1 in GET: show all the data - sport associations
    getAllAssociations:async function(res){
        const result = await sportassociation.find({});
        if (result) res.json(result);
        else res.status(404).send('Not Found Sport Associations');
    },

    // Query number 2 in POST: receives two params : year(number) and association_manager(string)
    updateAssociationByYear:async function(req, res){
        const conditions = {year:req.body.year};
        const update = {association_manager:req.body.association_manager};

        // this check if the params that sent in body == undefined || == empty 
        if(!conditions.year || !update.association_manager){
            res.send(`{"Failure": "No Update", "association_manager": ${JSON.stringify(update.association_manager)}, "year": ${JSON.stringify(conditions.year)}, "reason": "The parameters in body are undefined or empty"}`);
            console.log(`Inappropriate parameters - you need to send in body number and string.\nyear: ${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
            return;
        }
    
        if(conditions.year < 0 || update.association_manager < 0){
            res.send(`{"Failure": "No Update", "association_manager": ${JSON.stringify(update.association_manager)}, "year": ${JSON.stringify(conditions.year)}, "reason": "The parameters are negative"}`);
            console.log(`Inappropriate parameters - you need to send in body a POSITIVE number and string.\nyear: ${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
            return;
        }

          //validation for if the year is number and not a string 
          if(isNaN(conditions.year)){
            res.send(`{"Failure": "No Update", "association_manager": ${JSON.stringify(update.association_manager)}, "year": ${JSON.stringify(conditions.year)}, "reason": "The parameter year is not a number"}`);
            console.log(`You send in parameters string: ${JSON.stringify(conditions)} and not a number - please try again`);
            return;

        }

        const result = await sportassociation.updateOne(conditions, update);
        
        if(!result){
            res.status(404).send(`{"Failure": "No Updated", "association_manager": ${JSON.stringify(update.association_manager)}, "year": ${JSON.stringify(conditions.year)}, "reason": "Query failure"}`);
            return;
        }
        
        else if(result.nModified <= 0){
            res.send(`{"Failure": "No Update", "association_manager": ${JSON.stringify(update.association_manager)}, "year": ${JSON.stringify(conditions.year)}, "reason": "The year is not change or did not found "}`);
            console.log(`Did not update: ${JSON.stringify(update)} with conditions: ${JSON.stringify(conditions)}`);
        }
                    
        else{
            res.send(`{"Success": "Updated", "association_manager": ${JSON.stringify(update.association_manager)}, "year": ${JSON.stringify(conditions.year)}}`);
            console.log(`Successfully Updated Spoart Associstion with year: ${conditions.year} .Association manager is set to: ${update.association_manager}` );
            }

    },
     
    // Query number 3 in GET: receives two params : organization_name(string) and money_paid(number)
    money_of_organization:async function(req, res){
        const conditions = { organization_name:req.query.organization_name, money_paid:req.query.money_paid};
    
        // this check if the params that sent == undefined || == empty
        if(!conditions.money_paid || !conditions.organization_name){
            res.send(`{"Failure": "Not Found", "organization_name": ${JSON.stringify(conditions.organization_name)}, "money_paid":  ${JSON.stringify(conditions.money_paid)}, "reason": "The parameters are undefined or empty"}`);
            console.log(`Inappropriate parameters - you need to send in body string and number.\norganization_name: ${JSON.stringify(conditions.organization_name)} and money_paid: ${JSON.stringify(conditions.money_paid)}`);
            return;
        }
    
        if (conditions.money_paid < 0 || conditions.organization_name < 0){
            res.send(`{"Failure": "Not Found", "organization_name": ${JSON.stringify(conditions.organization_name)}, "money_paid":  ${JSON.stringify(conditions.money_paid)}, "reason": "The parameters are negative"}`);
            console.log(`Inappropriate parameters - you need to send in body string and a POSITIVE number.\norganization_name: ${JSON.stringify(conditions.organization_name)} and money_paid: ${JSON.stringify(conditions.money_paid)}`);
            return;
        }
        //validation for if the money_paid is number and not a string 
        if(isNaN(conditions.money_paid)){
            res.send(`{"Failure": "Not Found", "organization_name": ${JSON.stringify(conditions.organization_name)}, "money_paid":  ${JSON.stringify(conditions.money_paid)}, "reason": "The parameter money_paid is not a number"}`);
            console.log(`You send in params in field money_paid string: ${JSON.stringify(conditions.money_paid)} and not a number - please try again`);
            return;

        }
        const result = await sportassociation.find(conditions);

        if(!result){
            console.log(`not found`);
            res.status(404).send(`{"Fail": "Not Found", "organization_name": ${JSON.stringify(conditions.organization_name)}, "money_paid": ${JSON.stringify(conditions.money_paid)}, "reason": "Query failure"}`);

        }

        else if(result.length == 0){
                res.status(404).send(`{"Fail": "Not Found", "organization_name": ${JSON.stringify(conditions.organization_name)}, "money_paid": ${JSON.stringify(conditions.money_paid)}, "reason": "No documents found"}`);
                console.log(`No documents found:  ${JSON.stringify(conditions)}`)
        }
        else {
            res.send(JSON.stringify(result));
            console.log(`The query with params: ${JSON.stringify(conditions)} is success`)
        }             
    }
    
}
