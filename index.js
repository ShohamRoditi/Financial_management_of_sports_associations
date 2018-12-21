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

app.get('/associations', (req,res) => {
    ctrl.getAllAssociations(res);
    console.log("Client handled at /getAllAthletes, GET.");
})
    

app.post('/getAssociationByYear', (req, res)=> {
    const conditions = {year:req.body.year};
    const update = {association_manager:req.body.association_manager};
 
    if(!conditions.year || !update.association_manager){
        console.log(`Inappropriate parameters - you need to send in body number and string. year: ${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
        res.send(`Inappropriate parameters - you need to send in body number and string. year:
        ${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
        return;
    }

    if(conditions.year <= 0 || update.association_manager <= 0){
        console.log(`Inappropriate parameters - you need to send in body a POSITIVE number and string . year: ${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
        res.send(`Inappropriate parameters - you need to send in body a POSITIVE number and string
        year: ${JSON.stringify(conditions.year)} and association_manager: ${JSON.stringify(update.association_manager)}`);
        return;
    }
    ctrl.getAssociationByYear(conditions,update, res);
    console.log("Client handled at /getAssociationByYear, POST.");

})

app.get('/athlethes_of_organization',(req, res) => {
    const conditions = { organization_name:req.query.organization_name, number_of_athletes:parseInt(req.query.number_of_athletes)};
    
    // this if check if the params that sent in body == undefined || == empty || == 0 undifiend /null/ empty/!=0
    if(!conditions.number_of_athletes || !conditions.organization_name){
        console.log(`Inappropriate parameters - you need to send in body string and number. organization_name: ${JSON.stringify(conditions.organization_name)} and number_of_athlethes: ${JSON.stringify(conditions.number_of_athletes)}`);
        res.send(`Inappropriate parameters - you need to send in body string and number.
        organization_name: ${JSON.stringify(conditions.organization_name)} and number_of_athlethes: ${JSON.stringify(conditions.number_of_athletes)}`);
        return;
    }
    // if(conditions.number_of_athletes == undefined || conditions.organization_name == undefined){
    //     console.log("undefined value");
    //     res.send(`undefined`);
    //     return;
    // }

    // if(req.query.organization_name == "" || req.query.number_of_athletes == ""){
    //     console.log("empty");
    //     res.send(`empty`);
    //     return;
    // }

    if (conditions.number_of_athletes < 0 || conditions.organization_name < 0){
        console.log(`Inappropriate parameters - you need to send in body string and a POSITIVE number. organization_name: ${JSON.stringify(conditions.organization_name)} and number_of_athlethes: ${JSON.stringify(conditions.number_of_athletes)}`);
        res.send(`Inappropriate parameters - you need to send in body string and a POSITIVE number.
        organization_name: ${JSON.stringify(conditions.organization_name)} and number_of_athlethes: ${JSON.stringify(conditions.number_of_athletes)}`);
        return;
    }

    // console.log(conditions)
    ctrl.athlethes_of_organization(conditions,res)
    console.log("Client handled at /athlethes_of_organization, GET.");

})

app.listen(port,
 () => console.log('Express server ready for requests on:', port))