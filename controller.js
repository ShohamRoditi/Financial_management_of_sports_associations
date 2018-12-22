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
    getAllAssociations:function(res){
             sportassociation.find({}, (err, athletes)=>{
                if(err) {
                    console.log (`query error :${err}`)
                    res.status(404).send('not found');
                }
                else res.send(athletes)
            })
    },

    // Query number 2 in POST: receives two params : year and association_manager
    getAssociationByYear:function(conditions,update, res){
            const opts = {multi:true};
            sportassociation.updateOne(conditions, update, opts,
                (err, result) => {
                    if(err){
                        console.log(`err: ${err}`);
                        res.send(err);
                    }

                    else if(result.nModified  <= 0){
                        res.send(`Did not update: ${JSON.stringify(update)} with conditions: ${JSON.stringify(conditions)}`);
                        console(`Did not update: ${JSON.stringify(update)} with conditions: ${JSON.stringify(conditions)}`);
                    
                    }
                    
                    else{
                        console.log(`Successfully Updated SpoartAssocistion with year: ${conditions.year} .Year is set to: ${update.association_manager}` );
                        res.send(`Successfully Updated SpoartAssocistion with year: ${conditions.year} .Year is set to: ${update.association_manager}` );
                    }
                })

    },
     
    // Query number 3 in GET: receives two params : organization_name and number_of_athletes
    athletes_of_organization:function(conditions, res){
        sportassociation.find(conditions, (err, association) => {
            if(err){
                console.log(`Query Error: ${err}`);
                res.status(404).send(`not found: ${err}`);

            }
            else if(association.length == 0){
                        res.send(`No documents found: ${JSON.stringify(conditions)}`)
                        console.log(`No documents found:  ${JSON.stringify(conditions)}`)
                    }
            else {
                res.send(association);
                console.log(`The query with params: ${JSON.stringify(conditions)} is success`)}             
        })
    }
  
    
}
