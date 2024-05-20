import { pool } from "./connection.js";


async function getClients(){
    try{
        const [rows] = await pool.query("Select * from Client");
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function getClientsById(id){
    try {
        const [rows] = await pool.query("SELECT * from Client where idClient = ?" , [id]);
        return [rows];
    } catch (error) {
        console.log("[-] Error finding a client with his id in the data base" + error);
    }
}
async function InsertClient(nom  , prenom, email  ,password){
    try{
    const [result]  = await pool.query(`
    Insert into Client 
    (nomClient, prenomClient , passwordClient , emailClient) 
    values 
    (?, ? ,  ? , ?)`,[nom , prenom, password , email]);
    console.log("[+] new Client added to the data base ");
    return result;

    }catch(err){
        console.log("[-] Error inserting the new Client to the data base ");
        console.log(err);
    }
}
async function FindEmail(email){
    const [result] = await pool.query("Select * from Client where emailClient = ?" , [email]);
    if(result.length == 0){
        return false;
    }
    return true;
}
async function FindPassword(email){
    const [result] = await pool.query("Select * from Client where emailClient = ?" , [email]);
    if(result.length == 0){
        return "";
    }else{
        return result[0].passwordClient;
    }
}
async function getIdByEmail(email){
    const [result] = await pool.query("Select * from Client where emailClient = ?" , [email]);
    return result;
    if(result.length == 0){
        return 0;
    }else{
        return result[0].id;
    }
}
//find the email by id
async function getEmailByid(id){
    try {
        const [result] = await pool.query("Select emailClient from Client where idClient = ?" , [id]);
        return result;
    } catch (error) {
        console.log(error);
    }
}
//update section
export async function updateClientById(idClient , nomClient , prenomClient){
    try {
        const rows = pool.query(`
        UPDATE Client
        SET nomClient = ?, prenomClient = ?
        WHERE idClient = ?; ` , [nomClient , prenomClient , idClient]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteClientById(idClient){
    try {
        const rows = pool.query(`DELETE FROM Client WHERE idClient = ?;` , [idClient]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export {getClients , InsertClient, FindEmail ,getEmailByid, FindPassword , getIdByEmail , getClientsById};