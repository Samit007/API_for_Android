const Express = require('express');
const express= new Express();
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');
const knex = require('knex');
const config = require('./knexfile.js');
const dbClient = knex(config);
var path = require('path');
const userController=require('./controller/users')
const eventController=require('./controller/events')
const adminController=require('./controller/admin')
express.use(bodyParser.json());
const jwt=require('jsonwebtoken');
const SECRET_KEY = 10;
var uploadRouter = require('./upload.js');
express.use(Express.static(path.join(__dirname, 'public')));
express.use(cors());

async function deleteU(request,response){
    console.log(request.params.userid);
    await dbClient('users').where('userid',request.params.userid).del();
     response.json({
         status:"Success"
     })
     console.log("hit")
 }
 async function deleteE(request,response){
    console.log(request.params.userid);
    await dbClient('events').where('eventid',request.params.eventid).del();
     response.json({
         status:"Success"
     })
     console.log("hit")
 }

 express.delete('/api/v1/event', eventController.deleteEvent);
express.put('/api/v1/event', eventController.updateEvent);
express.get('/api/v1/event', eventController.getEvent);
express.post('/api/v1/event',eventController.createEvent);
express.delete('/api/v1/user', userController.deleteUser);
express.put('/api/v1/user', userController.updateUser);
express.get('/api/v1/user', userController.getUser);
express.post('/api/v1/user',userController.createUser);
express.post('/api/v1/authuser', userController.authUser);
express.use('/api/v1/upload', uploadRouter);
express.post('/api/v1/admin', adminController.createAdmin);
express.post('/api/v1/authadmin', adminController.authAdmin);
express.get('/api/v1/admin', adminController.getAdmin);
express.delete('/api/v1/user/:userid',deleteU);
express.delete('/api/v1/event/:eventid',deleteE);
express.listen(4000,'localhost',()=>{
    console.log("running on port 3000")
})