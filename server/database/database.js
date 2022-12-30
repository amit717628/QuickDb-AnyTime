// Database File // 
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { QuickDB } = require("quick.db");
const db = new QuickDB();


// Middleware // 
function checkToken(req,res,next){
    const token = req.header("auth");
    if (!token) return res.status(401).send({
        auth: false,
        error: "Access denied. No token provided"
    });

    try {
        const decoded = jwt.verify(token, "jwtPrivateKey");
        req.aayan = decoded;
    } catch (error) {
        return res.status(401).send({
            auth: false,
            error: "Wrong Token Provided"
        });
    }

    next();
}



// GET DATA // 
router.get(`/getdata/:value`, checkToken,async(req,res) => {
   
    try {
        // GETTING PARAMS FROM URL //
        const params = req.params;
        const data = params.value


        // IF DATA NOT PROVIDED
        if(!data){
            res.status(400).json({status: false , message: 'You must have provide the query to get the data !'})
        }

        // SEARCHING DATABASE QUERY 
        const database = await db.get(`${data}`)

        // IF DATA IS NULL 
        if(database === null) {
            res.status(404).json({status: false, message: 'Your Requested Query Returns Null'})
                    } else if(database){
                        // IF DATA FOUND //
                        res.status(200).json({status: true,data:database})
                        console.log('SENT /GET REQUEST TO CLIENT')
                    }
    } catch(err){
        // ON ERROR
res.status(500).json({status:false,message: 'Something Went Wrong From Server Side !'})
    }
})

// ENDING GET DATA //

// CREATING DATA //
router.post(`/createdata`, checkToken,async(req,res) => {
    try {
        // GETTING DATA FROM BODY //
    const provider = req.body.provider
    const value = req.body.value

    // IF NO PROVIDED
    if(!provider){
        res.status(400).json({status: false , message: 'You must have provide the query to save the data !'})
    }

    // RUN NEXT IF PROVIDED
    if(provider){
        if(value){
          
            // SAVING DATA //
           await db.set(provider,value)
            res.status(200).json({status: true,message: `Your data has been saved !`, provider: `${provider}`})
        } 
    }
} catch(err){
    // On Error
    res.status(500).json({status:false,message: 'Something Went Wrong From Server Side !'})
}
})
// ENDING CREATE DATA //

// DELETE DATA //

router.delete('/delete/:value', checkToken,async(req,res) => {
    try {
 // GETTING PARAMS FROM URL //
 const params = req.params;
 const data = params.value

 // IF DATA NOT PROVIDED
 if(!data){
    res.status(400).json({status: false , message: 'You must have provide the query to delete the data !'})
 }

 // CHECKING DATA
const database = await db.get(`${data}`)

// IF DATA IS NULL
 if(database === null) {
    res.status(404).json({status: false, message: 'Your Requested Query Returns Null'})
            } else if(data){
                // IF DATA FOUND //
                await db.delete(data)
                res.status(200).json({status: true,message: `Successfully Deleted Data !`})
              
            }
    } catch(err){

        // ON ERROR
        res.status(500).json({status:false,message: 'Something Went Wrong From Server Side !'})
    }
})


/*
You can add more methods if you want :-
Check The Guide https://quickdb.js.org/
Its Easy :)
*/

module.exports = router;


/* 
DEVELOPED BY AAYAN
*/