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
    getAssociationByYear:function(conditions,update, res){
        // const { year = null} = req.params
        
        // sportassociation.findOne(conditions, (err, association)=> {
        //     if(association) res.json(association)
        //     else{
        //          console.log(`Query Error: ${err}`);
        //          res.status(404).send(`not found: ${err}`);
        //     }
        // })
            // const conditions = {year:req.body.year};
            // const update = {association_manager:req.body.association_manager};
            console.log(conditions)
            console.log(update)
            const opts = {multi:true};
            // if (conditions < 0 ) {
            //     console.log(`the year is not valid ${conditions}`);
            //     res.send(`the year is not valid ${conditions}`);

            // }
            sportassociation.updateOne(conditions, update, opts,
                (err, result) => {
                    if(err){
                        console.log(`err: ${err}`);
                        res.send(err);
                    }

                    else if(result.nModified  <= 0){
                        res.send(`Did not update: ${JSON.stringify(update)} with conditions: ${JSON.stringify(conditions)}`);
                    
                    }
                    
                    // res.send(`Successfully updated ${JSON.stringify(update)} where conditions: ${JSON.stringify(conditions)}`);
                    else{
                        console.log(`Successfully Updated SpoartAssocistion with year: ${conditions.year} .year is set to: ${update.association_manager}` );
                        res.send(`Successfully Updated SpoartAssocistion with year: ${conditions.year} .year is set to: ${update.association_manager}` );
                    }
                })



    },
    
    // query number 3 in GET: receives two params : organization_name and number_of_athletes
    athlethes_of_organization:function(conditions, res){
        sportassociation.find(conditions, (err, association) => {
            if(err){
                console.log(`Query Error: ${err}`);
                res.status(404).send(`not found: ${err}`);

            }
            else if(association.length == 0){
                        res.send(`No documents found: ${JSON.stringify(conditions)}`)
                        console.log(`No documents found:  ${JSON.stringify(conditions)}`)
                    }
            else  {res.send(association);
                console.log(`The query with params : ${JSON.stringify(conditions)} is success`)}
            // else{
            //      console.log(`Query Error: ${err}`);
            //      res.status(404).send(`not found: ${err}`);
            // }

                        
        })
    }
  
    
}
