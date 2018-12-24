const express = require('express');
const ctrl = require('./controller');
const app = express();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', (req, res, next) => {
    console.log("A Client is trying to log in .");
    req.next();
})

app.get('/getAllAssociations', (req,res) => {
    ctrl.getAllAssociations(res);
    console.log("Client handled at /getAllAssociations, GET.");
})
    

app.post('/updateAssociationByYear', (req, res)=> {
    const conditions = {year:req.body.year};
    const update = {association_manager:req.body.association_manager};
     
    // this check if the params that sent in body == undefined || == empty 
    if(!conditions.year || !update.association_manager){
        console.log(`Inappropriate parameters - you need to send in body number and string.\nyear: ${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
        res.send(`Inappropriate parameters - you need to send in body number and string.
        year:${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
        return;
    }

    if(conditions.year < 0 || update.association_manager < 0){
        console.log(`Inappropriate parameters - you need to send in body a POSITIVE number and string.\nyear: ${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
        res.send(`Inappropriate parameters - you need to send in body a POSITIVE number and string.
        year: ${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
        return;
    }
    ctrl.updateAssociationByYear(conditions,update, res);
    console.log("Client handled at /updateAssociationByYear, POST.");
})

app.get('/athletes_of_organization',(req, res) => {
    const conditions = { organization_name:req.query.organization_name, number_of_athletes:req.query.number_of_athletes};
    
    // this check if the params that sent in body == undefined || == empty || == 0 undifiend /null/ empty/!=0
    if(!conditions.number_of_athletes || !conditions.organization_name){
        console.log(`Inappropriate parameters - you need to send in body string and number.\norganization_name: ${JSON.stringify(conditions.organization_name)} and number_of_athlethes: ${JSON.stringify(conditions.number_of_athletes)}`);
        res.send(`Inappropriate parameters - you need to send in body string and number.
        organization_name: ${JSON.stringify(conditions.organization_name)} and number_of_athlethes: ${JSON.stringify(conditions.number_of_athletes)}`);
        return;
    }
 
    if (conditions.number_of_athletes < 0 || conditions.organization_name < 0){
        console.log(`Inappropriate parameters - you need to send in body string and a POSITIVE number.\norganization_name: ${JSON.stringify(conditions.organization_name)} and number_of_athlethes: ${JSON.stringify(conditions.number_of_athletes)}`);
        res.send(`Inappropriate parameters - you need to send in body string and a POSITIVE number.
        organization_name: ${JSON.stringify(conditions.organization_name)} and number_of_athlethes: ${JSON.stringify(conditions.number_of_athletes)}`);
        return;
    }

    ctrl.athletes_of_organization(conditions,res)
    console.log("Client handled at /athletes_of_organization, GET.");
})

app.all('*', (req, res) => {
    res.json("This is not available route");
})


app.listen(port,
 () => {
     console.log(`Express server ready for requests on: ${port}`);
})