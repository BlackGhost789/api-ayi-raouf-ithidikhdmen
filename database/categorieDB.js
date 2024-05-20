import { pool } from "./connection.js";


async function getAllCategories(){
    try{
        const [rows] = await pool.query("Select * from Categorie");
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function InsertNewCategories(nom_categorie , imageCategorie){
    try{
        const [result]  = await pool.query(`Insert into Categorie 
        (nomCategorie , imageCategorie) 
        values (? , ?)`,[ nom_categorie , imageCategorie]);
        console.log("[+] a new categorie has inserted");
        return result;
    }catch(err){
        console.log("[-] Error inserting data to the categorie ");
        console.log(err);
    }
}
async function getCategorieById(id){
    try {
        const [row] = await pool.query(`SELECT  * from Categorie where idCategorie = ?` , [id]);
        return row;
    } catch (error) {
        console.log(error);
    }
}

export{getAllCategories , InsertNewCategories , getCategorieById};
