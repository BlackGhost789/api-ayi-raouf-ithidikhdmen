import { pool } from "./connection.js";


async function getAllBoisson(){
    try{
        const [rows] = await pool.query("Select * from Boisson");
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function InsertNewBoisson(nom , imageBoisson , prix  , idCategorie){
    try{
        const [rows] = await pool.query(`
        Insert into Boisson (nomBoisson , imageBoisson, prixBoisson, idCategorie) 
        values (?,?,?,?)`, [nom , imageBoisson , prix , idCategorie]);
        console.log("[+] New Boisson added to the db");
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function UpdateBoissonById(id , nom , imagePlat  ,prix  , idCategorie){
    try{
        const [rows] = await pool.query(`UPDATE 
        Plat
        SET nomBoisson  = ? , imageBoisson = ? , prixBoisson = ?, idCategorie = ? 
        WHERE idBoisson = ?;` , [nom , imageBoisson , prix  , idCategorie, id]);
        console.log(`[+] Plat with id ${id} has been updated succesfully`);
    }catch(err){
        console.log("[-] Error getting plat by his id" + err);
    }
}
async function getBoissonById(id){
    try {
        const [rows] = await pool.query(`Select * from Boisson where idBoisson = ?` , [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getBoissonByCategories(idCategorie){
    try {
        const [rows] = await pool.query(`Select * from Boisson where idCategorie = ?` , [idCategorie]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


export{getAllBoisson , InsertNewBoisson , UpdateBoissonById , getBoissonById, getBoissonByCategories};