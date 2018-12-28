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
    ctrl.updateAssociationByYear(req, res);
    console.log("Client handled at /updateAssociationByYear, POST.");
})

app.get('/money_of_organization',(req, res) => {
    ctrl.money_of_organization(req,res)
    console.log("Client handled at /money_of_organization, GET.");
})

app.get('/api', (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/5643605/Rzn8RhzR");
})

app.all('*', (req, res) => {
    res.json("This is not available route");
})


app.listen(port,
 () => {
     console.log(`Express server ready for requests on: ${port}`);
})