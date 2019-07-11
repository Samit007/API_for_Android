const knex = require('knex');
const config = require('../knexfile');
const dbClient = knex(config);
const Express = require('express');
const express= new Express();
const bodyParser = require('body-parser');
express.use(bodyParser.json());

async function authUsr({
  table,
    first
}){
  const phone=first;
  const data = await dbClient
  .table(table)
  .first('password')
  .select('userid')
  .where('phone',phone)
  return data;
}

async function authAdm({
  table,
    first
}){
  const phone=first;
  const data = await dbClient
  .table(table)
  .first('password')
  .where('phone',phone)
  return data;
}

async function fetchAdmin({
  table,
    payload
}){
  const data = await dbClient
  .table(table)
  .select(payload)
  return data;
}

async function delUser({
  table,
    where
}){
  const data = await dbClient
  .table(table)
  .where('userid',where)
  .del()
  return data;
}

async function uptUser({
  table,
    where,
      payload
}){
  const data = await dbClient
  .table(table)
  .where('userid',where)
  .update(payload)
  return data;
}

async function fetchUser({
  table,
    payload
}){
  const data = await dbClient
  .table(table)
  .select(payload)
  return data;
}



async function saveAdmin({
  table,
    payload
}) {
    const data = await dbClient
    .table(table)
    .insert(payload)
    return data;
}
async function saveUser({
  table,
    payload
}) {
    const data = await dbClient
    .table(table)
    .insert(payload)
  
  return data;
}

async function delEvent({
  table,
    where
}){
  const data = await dbClient
  .table(table)
  .where('eventid',where)
  .del()
  return data;
}

async function uptEvent({
  table,
    where,
      payload
}){
  const data = await dbClient
  .table(table)
  .where('eventid',where)
  .update(payload)
  return data;
}

async function fetchEvent({
  table,
    payload
}){
  const data = await dbClient
  .table(table)
  .select(payload)
  return data;
}



async function saveEvent({
  table,
    payload
}) {
    const data = await dbClient
    .table(table)
    .insert(payload)
    return data;
}



  module.exports = {
    saveUser:saveUser,
    saveAdmin:saveAdmin,
    fetchAdmin:fetchAdmin,
    fetchUser:fetchUser,
    authAdm:authAdm,
    authUsr:authUsr,
    uptUser:uptUser,
    delUser:delUser,
    delEvent:delEvent,
    uptEvent:uptEvent,
    fetchEvent:fetchEvent,
    saveEvent:saveEvent
   }