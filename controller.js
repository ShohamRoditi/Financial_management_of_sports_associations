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
    getAllAssociations:function(res){
        //  mongoose
        // .connect(url,options)
        //  .then((err, res) => {

        /// this is work
             sportassociation.find({}, (err, athletes)=>{
                if(err) {
                    console.log (`query error :${err}`)
                    res.status(404).send('not found');
                }
                else res.send(athletes)
            })

            // this is work 

        //     const result = sportassociation.find({})
        //     if(result) res.json(result)
        //     else res.status(404).send('not found');
        // })
        // .catch(err => {
        //     console.error('some error occured', err)
        //     res.status(500).send(err.message)
        // })


    },
    getAssociationByYear:function(req, res){
        // const { year = null} = req.params
        
        // sportassociation.findOne(conditions, (err, association)=> {
        //     if(association) res.json(association)
        //     else{
        //          console.log(`Query Error: ${err}`);
        //          res.status(404).send(`not found: ${err}`);
        //     }
        // })
            const conditions = {year:req.body.year};
            const update = {association_manager:req.body.association_manager};
            console.log(conditions)
            console.log(update)
            const opts = {multi:true};
            sportassociation.updateOne(conditions, update, opts,
                (err) => {
                    if(err){
                        console.log(`err: ${err}`);
                        res.send(err);
                    }
                    else{
                        console.log(`Successfully Updated SpoartAssocistion with year:${conditions.year} 
                        .year is set to: ${update.association_manager}` );
                        res.send(`Successfully Updated SpoartAssocistion with year:${conditions.year} 
                        .year is set to: ${update.association_manager}` );
                    }
                })



    },
        
    athlethes_paid_money:function(conditions, res){
        // const number_of_athletes = {number_of_athletes:req.body.number_of_athletes};
        // const money = { money_paid:req.body.money_paid}
        sportassociation.find(conditions, (err, association) => {
            if(association) res.send(association);
            else{
                 console.log(`Query Error: ${err}`);
                 res.status(404).send(`not found: ${err}`);
            }
        })
    }
  
    
}
