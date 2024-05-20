import { pool } from "./connection.js";
import { InsertActeur , FindEmailActeur } from "../database/ArchiveDB.js";



async function getAllLivreur(){
    try{
        const [rows] = await pool.query("Select * from Livreur");
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function InsertNewLivreur(nom , prenom , email , password , disponible ){
    try {
        const [rows] = await pool.query(`
        insert into Livreur
        (nomLivreur , prenomlivreur , email , passwordLivreur , disponible)
        values (?,?,?,?,?)`,[nom , prenom , email ,password , true]);

        console.log("[+] A NEW LIVREUR ADDED TO THE DATA BASE ");
        await InsertActeur(email , "Livreur");
        return rows;
    } catch (error) {
        console.log(error);
    }
}
async function ChangeStateOfLivreur(id , state){
    try {
        const [rows] = await pool.query("UPDATE Livreur set disponible = ? where idLivreur = ?" , [state , id]);
        console.log(`Livreur of id = ${id} has been of state ${state}`);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
async function getDisponibleLivreur(){
    try{
        const [rows] = await pool.query("Select * from Livreur where disponible = ?" , [1]);
        return rows;
    }catch(err){
        console.log(err);
    }
}
async function FindEmailLivreur(email){
    const [result] = await pool.query("Select * from Livreur where email = ?" , [email]);
    if(result.length == 0){
        return false;
    }
    return true;
}
async function FindLivreurByEmail(email){
    const [result] = await pool.query("Select * from Livreur where email = ?" , [email]);
    
    return result;
}
async function FindPasswordLivreur(email){
    const [result] = await pool.query("Select * from Livreur where email = ?" , [email]);
    if(result.length == 0){
        return "";
    }else{
        return result[0].passwordLivreur;
    }
}
export async function UpdateLivreurById(LivrerurID , nomLivreur  , prenomlivreur){
        try {
            const rows = pool.query(`
            UPDATE Livreur
            SET nomLivreur = ?, prenomLivreur = ?
            WHERE idClient = ?; ` , [nomLivreur , prenomlivreur , LivrerurID]);
            return rows;
        } catch (error) {
            console.log(error);
        }
}
export async function deleteLivreurById(idLivreur){
    try {
        const rows = pool.query(`DELETE FROM Livreur WHERE idLivreur = ?;` , [idLivreur]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getCommandeOfLivreur(idLivreur){
    try{
        const [rows] = await pool.query(
        `Select * 
        from Livreur 
        inner join Commande 
        where Commande.idLivreur = Livreur.idLivreur
        and Commande.state = 0` , [idLivreur]);

        console.log(rows);
        return rows;
    }catch(err){
        console.log(err);
    }
}


export{getAllLivreur , InsertNewLivreur ,  FindEmailLivreur , FindPasswordLivreur, ChangeStateOfLivreur , getDisponibleLivreur, getCommandeOfLivreur, FindLivreurByEmail};
