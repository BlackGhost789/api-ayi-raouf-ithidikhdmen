import { pool } from "./connection.js";


async function getAllProduit(){
    try{
        const [rows] = await pool.query("Select * from Plat");
        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function InsertNewProduit(nom , imagePlat , prix , ingredient , idCategorie){
    try{
        const [rows] = await pool.query(`
        Insert into Plat (nomPlat , imagePlat, prixPlat , ingredient , idCategorie) 
        values (?,?,?,?,?)`, [nom , imagePlat , prix , ingredient , idCategorie]);
        console.log("[+] New Plat added to the db");
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function UpdatePlatById(id , nom , imagePlat  ,prix , ingredient , idCategorie){
    try{
        const [rows] = await pool.query(`UPDATE 
        Plat
        SET nomPlat  = ? , imagePlat = ? , prixPlat = ?, ingredient = ? , idCategorie = ? 
        WHERE idPlat = ?;` , [nom , imagePlat , prix , ingredient , idCategorie , id]);
        console.log(`[+] Plat with id ${id} has been updated succesfully`);
    }catch(err){
        console.log("[-] Error updating plat by his id" + err);
    }
}
async function getPlatById(id){
    try {
        const [rows] = await pool.query(`Select * from Plat where idPlat = ?` , [id]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getPlatsByCategories(idCategorie){
    try {
        const [rows] = await pool.query(`Select * from Plat where idCategorie = ?` , [idCategorie]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export{getAllProduit , InsertNewProduit , UpdatePlatById , getPlatById , getPlatsByCategories};