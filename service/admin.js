const fetchAdmin = require('../utils/index');


async function authAdmin(phone){
    try{
      const adm= await fetchAdmin.authAdm({
        table:'admin',
        first: phone
      });
      return adm;
    }catch(error) {
      throw new Error(error);
  }
}


async function getAdmin(){
    try {
      const admin = await fetchAdmin.fetchAdmin({
        table: 'admin',
        payload:'*'
      });
      return admin;
    } catch(error) {
      throw new Error(error);
    }
  }

async function createAdmin(data) {
    try {
      const result= await fetchAdmin.saveAdmin({
        table: 'admin',
        payload:{
        phone:data.phone,
        password:data.password,
        }
      });
      return result;
    } catch(error) {
      throw new Error(error);
    }
  }

  module.exports ={
    createAdmin: createAdmin,
    getAdmin:getAdmin,
    authAdmin:authAdmin
}