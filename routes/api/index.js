const express = require('express')
const router = express.Router()
let config = require('../../config.js')
const mysql = require('mysql')
let connection = mysql.createConnection(config)

//list all company we have
//route api/index/company @GET
router.get('/company', async (req, res)=>{
    let stmt = `SELECT * FROM company`;
    connection.query(stmt, (error,results,fields)=>{
        if(error){
            return console.error(error.message)
        }
        res.status(200).send(results)
    })
})
//create new
//route api/index/company @POST 
router.post('/company',async (req, res)=>{
    try{
        //this value req.body
    const {companyName, companyEmail, companyDescription ,
         companyCategory,companyWebsite,
         companyPhoneNumber} = req.body;
          const Cdate = new Date()
    let stmt = `INSERT INTO company(Cname, Cemail,Cdescription,Ccategory,Cwebsite,CphoneNumber,Cdate) 
    VALUES (?,?,?,?,?,?,?)`;
    let companyVal = [companyName,companyEmail,companyDescription,companyCategory,companyWebsite,companyPhoneNumber,Cdate]
    connection.query(stmt,companyVal,(err,results,fields)=>{
        if(err){
            return console.error(err.message)
        }
        //get inserted id
        res.status(200).send(results)
    })
    }
    catch(err){
        res.status(500).send(err)
    }
})
//this route will list company contacts person(many)
//route api/index/company/:id @GET -----need---help---
router.get('/company/contacts/:id',async (req, res)=>{
    const id = req.params.id;
    let stmt = `SELECT * FROM contact WHERE Cid=${id}`;
    connection.query(stmt, (error,results,fields)=>{
        if(error){
            return console.error(error.message)
        }
        res.status(200).send(results)
    })
})
//this route will add contact person to a company
// route api/index/company/:id @POST
router.post('/company/:id', async(req,res)=>{
    try{
        //sample hardcoded datas
        const {name, phoneNumber, 
              address, email,position} = req.body
          const Cdate = new Date()
          const companyId = req.params.id;
    let stmt = `INSERT INTO contact(name,phoneNumber, email, address, Cid, position,date) 
    VALUES (?,?,?,?,?,?,?)`;
    let companyVal = [name,phoneNumber,email,address,companyId,position,Cdate]
    connection.query(stmt,companyVal,(err,results,fields)=>{
        if(err){
            return console.error(err.message)
        }
        //get inserted id
        res.status(200).send(results)
    })
    }
    catch(err){
        res.status(500).send(err)
    }
})

//this route will display single company detail
//route /api/index/company/contact/:id @GET
router.get('/company/:id', async(req, res)=>{
    const id = req.params.id;
    let stmt = `SELECT * FROM company WHERE Cid=${id}`;
    connection.query(stmt, (error,results,fields)=>{
        if(error){
            return console.error(error.message)
        }
        res.status(200).send(results)
    })
})

//this route will edit/update company data
//route /api/index/company/edit/:id @put
router.put('/company/edit/:id',async(req, res)=>{
    const companyId = req.params.id 
    try{
        //sample hardcoded datas
        const {companyName, companyPhoneNumber, 
              companyEmail,companyDescription,companyCategory,companyWebsite} = req.body
          const Cdate = new Date()
         let sql = `UPDATE company SET Cname=?,CphoneNumber=?,Cemail=?,Cdescription=?,Ccategory=?,Cwebsite=?,Cdate=? WHERE Cid=?`;
         let data = [companyName,companyPhoneNumber,companyEmail,companyDescription,companyCategory,companyWebsite,Cdate,companyId]

         connection.query(sql,data,(err,results,fields)=>{
        if(err){
            return console.error(err.message)
        }
        //get inserted id
         res.status(200).send(true)
    })   
    }
    catch(err){
        res.status(500).send(err)
    }
})


//this route will edit contact person with in a company
//route /api/index/company/contact/:id @Put
router.put('/company/contact/:id',async(req, res)=>{
    const contactId = req.params.id 
    try{
        //sample hardcoded datas
        const {name, phoneNumber, 
              address, email,position,Cid} = req.body
          const Cdate = new Date()
         let sql = `UPDATE contact SET name=?,phoneNumber=?,email=?,address=?,Cid=?,position=?,date=? WHERE id=?`;
         let data = [name,phoneNumber,email,address,Cid,position,Cdate,contactId]

         connection.query(sql,data,(err,results,fields)=>{
        if(err){
            return console.error(err.message)
        }
        //get inserted id
         res.status(200).send(true)
    })   
    }
    catch(err){
        res.status(500).send(err)
    }
})

//this route will delete a company data and its contact
router.delete('/company/:id',async(req, res)=>{
    const id = req.params.id
    stmt = `DELETE FROM contact WHERE Cid = ${id}`
    connection.query(stmt,(error, result,fields)=>{
        if(error){
            return console.error(error.message)
        }
    })
    stmt = `DELETE FROM company WHERE Cid=${id}`
    connection.query(stmt, (error,results,fields)=>{
        if(error){
            return console.error(error.message)
        }
        res.status(200).send(results)
    })
})

//this route will delete contact person 
router.delete('/company/contact/:id', async(req, res)=>{
    const contactId = req.params.id
    stmt = `DELETE FROM contact WHERE id=${contactId}`
    connection.query(stmt, (error,results,fields)=>{
        if(error){
            return console.error(error.message)
        }
        res.status(200).send(results)
    })
})

//this route will display data for single contact
//route /api/index/contact
router.get('/contact/:id',async (req, res)=>{
    const id = req.params.id;
    let stmt = `SELECT * FROM contact WHERE id=${id}`;
    connection.query(stmt, (error,results,fields)=>{
        if(error){
            return console.error(error.message)
        }
        res.status(200).send(results)
    })
})


module.exports = router;