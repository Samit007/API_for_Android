const eventService = require('../service/events');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET_KEY ='secret_key';
const jwtMiddle=require('express-jwt-middleware');
const Express = require('express');
const express= new Express();
const bodyParser = require('body-parser');
express.use(bodyParser.json());
const knex = require('knex');
const config = require('../knexfile');
const dbClient = knex(config);

async function  getEvent(request,response){

    console.log("hit");
   
        const result=await eventService.getEvent();
        console.log(result)
        response.json(
            result
        )
}

async function deleteEvent(request,response){
    const eventid = request.body.eventid;
    console.log(eventid);
    const data ={
        eventid:eventid
    }
    try{
        const result=await eventService.deleteEvent(data);
        response.json({
            status:'success',
            message: 'success',
            data:data
        })
    }catch(error){
        response.json({
            message:'fail'
        })
    }
}

async function updateEvent(request,response){
    const eventname = request.body.eventname;
    const eventid = request.body.eventid;
    const eventaddress = request.body.eventaddress;
    const eventstarttime = request.body.eventstarttime;
    const eventendtime = request.body.eventendtime;
    const eventdate = request.body.eventdate;
    const data = {
        eventid:eventid,
        eventname:eventname,
        eventaddress:eventaddress,
        eventstarttime:eventstarttime,
        eventendtime:eventendtime,
        eventdate:eventdate
    }
    try{
        const result=await eventService.updateEvent(data);
        response.json({
            status:'success',
            message:"success",
            data:data
        })
    }catch(error){
        response.json({
            message:'error'
        })
    }
}

async function createEvent(request,response){
    const eventname = request.body.eventname;
    const eventid = request.body.eventid;
    const eventaddress = request.body.eventaddress;
    const eventstarttime = request.body.eventstarttime;
    const eventendtime = request.body.eventendtime;
    const eventdate = request.body.eventdate;
    const data = {
        eventid:eventid,
        eventname:eventname,
        eventaddress:eventaddress,
        eventstarttime:eventstarttime,
        eventendtime:eventendtime,
        eventdate:eventdate
    }    
    try{
        const result=await eventService.createEvent(data);
        response.json({
            status:'success',
            message:'Successfully Registered',
            data:data
        })
    }catch(error){
        response.json({
            message:'fail'
        })
    }
}
module.exports ={
    createEvent:createEvent,
    getEvent:getEvent,
    updateEvent:updateEvent,
    deleteEvent:deleteEvent
}