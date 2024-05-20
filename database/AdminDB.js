import { pool } from "./connection.js";

async function getAdmin(){
    try{
        const [rows] = await pool.query("Select * from Admin");
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function getAdminByHisId(id){
    try {
        const [rows] = await pool.query("SELECT * from Admin where idAdmin = ?" , [id]);
        return [rows];
    } catch (error) {
        console.log("[-] Error finding a client with his id in the data base" + error);
    }
}
async function InsertNewAdmin(nom  , prenom ,email ,password){
    try{
    const [result]  = await pool.query(`
    Insert into Admin 
    (nomAdmin, prenomAdmin , emailAdmin ,  passwordAdmin) 
    values 
    (?, ? , ? ,  ? )`,[nom , prenom, email ,password ]);
    console.log("[+] new Admin added to the database ");
    return result;

    }catch(err){
        console.log("[-] Error inserting the new Admin to the data base ");
        console.log(err);
    }
}
async function FindEmailAdmin(email){
    const [result] = await pool.query("Select * from Admin where emailAdmin = ?" , [email]);
    if(result.length == 0){
        return false;
    }
    return true;
}
async function FindPasswordAdmin(email){
    const [result] = await pool.query("Select * from Admin where emailAdmin = ?" , [email]);
    if(result.length == 0){
        return "";
    }else{
        return result[0].passwordAdmin;
    }
}



export {getAdmin , InsertNewAdmin, FindEmailAdmin , FindPasswordAdmin, getAdminByHisId};