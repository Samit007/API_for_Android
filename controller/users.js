const userService = require('../service/users');
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


async function authUser(request, response, next) {
    console.log("hit User login");
    const phone = request.body.phone;
    const password = request.body.password;
    const result = await userService.authUser(phone);
    if (result == undefined) {
        response.json({
            message: "user not found"
        })
    }
    else {
        const passwordFromJson = result.password;
        console.log(passwordFromJson)
        const isMatch = bcrypt.compareSync(password, passwordFromJson);
        if (isMatch) {
            const accessToken = jwt.sign({
                phone: phone,

            }, SECRET_KEY);
            response.json({
                status: 'true',
                userid: result.userid,
                password: result.password,
                data: result,
                accessToken: accessToken
            })
        } else {
            response.json({
                status: 'wrong credintial',
            })
        }
    }
}
async function  getUser(request,response){

    console.log("hit user");
   
        const result=await userService.getUser();
        console.log(result)
        response.json(
            result
        )
}

async function deleteUser(request,response){
    const userid = request.body.userid;
    console.log(userid);
    const data ={
        userid:userid
    }
    try{
        const result=await userService.deleteUser(data);
        response.json({
            status:'success',
            message: "success",
            data:data
        })
    }catch(error){
        response.json({
            message:'fail'
        })
    }
}

async function updateUser(request,response){
    console.log(request.body.firstname);
    console.log(request.body.lastname);
    console.log(request.body.email);
    console.log(request.body.hashedPassword);
    console.log(request.body.userid);
    console.log(request.body.address);
    console.log(request.body.phone);
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const password = request.body.password;
    const email = request.body.email;
    const userid = request.body.userid;
    const address = request.body.address;
    const phone = request.body.phone;
    const gender = request.body.gender;
    const blood_group = request.body.blood_group;
    const date_of_birth = request.body.date_of_birth;
    const imagename = request.body.imagename;
    const hashedPassword=bcrypt.hashSync(password,10);
    const data = {
        userid:userid,
        firstname:firstname,
        phone:phone,
        lastname:lastname,
        password:hashedPassword,
        userid:userid,
        email:email,
        imagename:imagename,
        address:address,
        gender:gender,
        blood_group:blood_group,
        date_of_birth:date_of_birth,
    }
    try{
        const result=await userService.updateUser(data);
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

async function createUser(request,response){
    console.log(request.body.firstname);
    const userid=request.body.userid;
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const password = request.body.password;
    const email = request.body.email;
    const phone = request.body.phone;
    const address = request.body.address;
    const gender = request.body.gender;
    const blood_group = request.body.blood_group;
    const date_of_birth = request.body.date_of_birth;
    const imagename = request.body.imagename;
    const hashedPassword=bcrypt.hashSync(password,10);
    const data = {
        userid:userid,
        firstname:firstname,
        lastname:lastname,
        password:hashedPassword,
        email:email,
        phone:phone,
        address:address,
        gender:gender,
        blood_group:blood_group,
        date_of_birth:date_of_birth,
        imagename:imagename
    }    
    try{
        const result=await userService.createUser(data);
        response.json({
            status:'success',
            message:'Successfully Registered',
            data:data
        })
    }catch(error){
        response.json({
            message:'phone number already registered'
        })
    }
}


module.exports ={
    createUser: createUser,
    getUser:getUser,
    authUser:authUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}
