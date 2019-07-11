const fetchEvent = require('../utils/index');
const Express = require('express');
const express= new Express();
const bodyParser = require('body-parser');
express.use(bodyParser.json());

async function deleteEvent(data){
  try{
    const del = await fetchEvent.delEvent({
      table:'events',
      where:(data.eventid)
    });
    return del;
  }catch(error){
    throw new Error(error);
  }
}


async function updateEvent(data){
  try{
    const upt = await fetchEvent.uptEvent({
      table: 'events',
      where : data.eventid,
      payload:{
        eventname:eventname,
        eventaddress:eventaddress,
        eventstarttime:eventstarttime,
        eventendtime:eventendtime,
        eventdate:eventdate
        }
    });
    return upt;
  }catch(error) {
    throw new Error(error)
  }
}
  async function updateEvent(data){
    try{
    const update = await fetchEvent.uptEvent({
    table: 'events',
    where : data.eventid,
    payload:{
        eventid:data.eventid,
        eventname:data.eventname,
        eventaddress:data.eventaddress,
        eventstarttime:data.eventstarttime,
        eventendtime:data.eventendtime,
        eventdate:data.eventdate
    }
  });
    return update;
  }catch(error) {
    throw new Error(error)
  }
}
async function getEvent(){
  try {
    const event = await fetchEvent.fetchEvent({
      table: 'events',
      payload:'*'
    });
    return event;
  } catch(error) {
    throw new Error(error);
  }
}

async function createEvent(data) {
    try {
      const result= await fetchEvent.saveEvent({
        table: 'events',
        payload:{
            eventname:data.eventname,
            eventaddress:data.eventaddress,
            eventstarttime:data.eventstarttime,
            eventendtime:data.eventendtime,
            eventdate:data.eventdate
      }
      });
      return result;
    } catch(error) {
      throw new Error(error);
    }
  }

  
  module.exports ={
    createEvent: createEvent,
    getEvent:getEvent,
    updateEvent:updateEvent,
    deleteEvent:deleteEvent
}