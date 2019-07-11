const fetchUser = require('../utils/index');
const Express = require('express');
const express= new Express();
const bodyParser = require('body-parser');
express.use(bodyParser.json());

async function authUser(phone){
  try{
    const usr= await fetchUser.authUsr({
      table:'users',
      first: phone
    });
    return usr;
  }catch(error) {
    throw new Error(error);
}
}

async function deleteUser(data){
  try{
    const del = await fetchUser.delUser({
      table:'users',
      where:(data.userid)
    });
    return del;
  }catch(error){
    throw new Error(error);
  }
}


async function updateUser(data){
  try{
    const upt = await fetchUser.uptUser({
      table: 'users',
      where : data.userid,
      payload:{
        firstname:data.firstname,
        lastname:data.lastname,
        password:data.password,
        email:data.email,
        address:data.address,
        gender:data.gender,
        blood_group:data.blood_group,
        date_of_birth:data.date_of_birth,
        imagename:data.imagename,
        }
    });
    return upt;
  }catch(error) {
    throw new Error(error)
  }
}
  async function updateUser(data){
    try{
    const update = await fetchUser.uptUser({
    table: 'users',
    where : data.userid,
    payload:{
    userid:data.userid,
    firstname:data.firstname,
    lastname:data.lastname,
    phone:data.phone,
    password:data.password,
    email:data.email,
    address:data.address,
    gender:data.gender,
    blood_group:data.blood_group,
    date_of_birth:data.date_of_birth,
    imagename:data.imagename,
  }
  });
    return update;
  }catch(error) {
    throw new Error(error)
  }
}
async function getUser(){
  try {
    const user = await fetchUser.fetchUser({
      table: 'users',
      payload:'*'
    });
    return user;
  } catch(error) {
    throw new Error(error);
  }
}

async function createUser(data) {
    try {
      const result= await fetchUser.saveUser({
        table: 'users',
        payload:{
        firstname:data.firstname,
        lastname:data.lastname,
        password:data.password,
        email:data.email,
        address:data.address,
        phone:data.phone,
        gender:data.gender,
        blood_group:data.blood_group,
        date_of_birth:data.date_of_birth,
        imagename:data.imagename
        }
      });
      return result;
    } catch(error) {
      throw new Error(error);
    }
  }

  
  module.exports ={
    createUser: createUser,
    getUser:getUser,
    authUser:authUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}