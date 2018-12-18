const express = require('express');
const ctrl = require('./controller');
const app = express();

const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//  app.get('/associations', ctrl.getAllAssociations);

app.all('*', (req, res, next) => {
    console.log("A Client is trying to log in .");
    req.next();
})

app.get('/associations', (req,res) =>{
    ctrl.getAllAssociations(res);
    console.log("Client handled at /getAllAthletes, GET.");
})
    

app.post('/associationsyear', (req, res)=>{
    ctrl.getAssociationByYear(req, res);
    console.log("Client handled at /associationsyear, POST.");

})

app.get('/athlethes_paid_money',(req, res) => {
    const conditions = { organization_name:req.query.organization_name};
    console.log(conditions)
    ctrl.athlethes_paid_money(conditions,res)
    console.log("Client handled at /athlethes_paid_money, GET.");

})

app.listen(port,
 () => console.log('Express server ready for requests on:', port))