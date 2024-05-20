import { pool } from "./connection.js";


async function getAllCommande(){
    const [rows] = await pool.query("Select * from Commande where state = 0");
    return rows;
}

async function getComamndeById(id_Commande){
    try{
        const [row] = await pool.query("Select * from Commande where idCommande = ?" , [id_Commande]);
        return row;
    }catch(err){
        console.log(err);
    }
}

async function insertnewCommande(location , date ,  idClient , idLivreur ){
        
    
    try{
            const [result]  = await pool.query(
                `Insert into Commande
                (location, date , idClient , idLivreur)
                 values (? , ? , ? , ?)`,
                 [location , date , idClient , idLivreur]);
            console.log("[+] a new command has inserted To the data base");
            return result;
        }catch(err){
            console.log("[-] Error inserting data to the Commande ");
            console.log(err);
        }
}

async function getCommandeOfidClient(idClient){
    try{
        const [rows] = await pool.query("select * from Commande where idClient = ? " , [idClient]);
        return rows;
    }catch(err){
        console.log(err);
    }
}

async function DeleteCommandeById(id){
    try{
        const [row] = await pool.query(`
        DELETE FROM Commande
        WHERE idCommande = ?;`,[id]);
        console.log(`[+]Commande with id ${id} has been deleted succesfully`);
        return row;
    }catch(err){
        console.log(err);

    }
}

async function UpdateLivreurOfACommande(idCommand , idLivreur){
    try{
        const [rows] = await pool.query(`UPDATE 
        Commande
        SET idLivreur = ?
        WHERE idCommande = ?;` , [idLivreur , idCommand]);
        console.log(`[+] Livreur with id :${idLivreur} go for the commande ${idCommand}}`);
        return true;
    }catch(err){
        console.log("[-] Error getting plat by his id" + err);
        return false;
    }
}

export async function changeStateOfCommandeByIdCommande(idCommand,boolean){
    try{
        const [rows] = pool.query("UPDATE Commande set state = ? where IdCommande = ?" , [boolean  , idCommand])
    }catch(err){
        console.log(err);
    }
}

export async function getAllCommandeLivre(){
    try{
        const [row] = await pool.query("Select * from Commande where state = ?" , [true]);
        console.log(row)
        return [row];
    }catch(err){
        console.log(err);
    }
}

export{getAllCommande , insertnewCommande , UpdateLivreurOfACommande,  getComamndeById , DeleteCommandeById , getCommandeOfidClient};
