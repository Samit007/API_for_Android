const adminService = require('../service/admin');
const Express = require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const SECRET_KEY ='secret_key';
const jwtMiddle=require('express-jwt-middleware');

async function authAdmin(request,response,next){
    console.log("hit login");
    const phone=request.body.phone;
    const password = request.body.password;
    const result=await adminService.authAdmin(phone);
    
    const passwordFromJson=result.password;
    console.log(passwordFromJson)
    const isMatch=bcrypt.compareSync(password,passwordFromJson);
    if(isMatch){
        const accessToken=jwt.sign({
            phone:phone
        },SECRET_KEY);
        response.json({
            status:'true',
            data:result,
            accessToken: accessToken
            })
        }else{
            response.json({
                status:'false',
            })
    }
}


async function  getAdmin(request,response){

    console.log("hit");
   
        const result=await adminService.getAdmin();
        response.json({
            status:'success',
            data2:result
        })
}

async function createAdmin(request,response){
    console.log(request.body.phone);
    const phone=request.body.phone;
    const password = request.body.password;
    const hashedPassword=bcrypt.hashSync(password,10);
    const data = {
        phone:phone,
        password:hashedPassword
    }
    try{
        const result=await adminService.createAdmin(data);
        response.json({
            status:'success',
            data:data
        })
    }catch(error){
        response.json({
            status:'fail'
        })
    }
}
module.exports ={
    createAdmin: createAdmin,
    getAdmin: getAdmin,
    authAdmin:authAdmin

}