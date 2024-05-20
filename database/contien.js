import { pool } from "./connection.js";


export async function insertContienPlat(idCommand , idPlat , quantite){
    try{
        const [result]  = await pool.query(
            `Insert into contienPlat
            (idCommande ,idPlat , quantite)
             values (? , ?  , ? )`,
             [idCommand, idPlat ,quantite]);
        console.log("[+] a new contien has inserted To the data base");
        return result;
    }catch(err){
        console.log("[-] Error inserting data to the contien");
        console.log(err);
    }
}

export async function insertContienBoisson(idCommand , idBoisson , quantite){
    try{
        const [result]  = await pool.query(
            `Insert into contienBoisson
            (idCommande ,idBoisson , quantite)
             values (? , ? , ? )`,
             [idCommand, idBoisson ,quantite]);

             return result;
    }catch(err){
        console.log("[-] Error inserting data to the contienBoisson");
        console.log(err);
    }
}

//this function will return all the plat of a specific id command 
export async function selectCommandeofContienPlat(idCommande){
    
    try{
        const [result] = await pool.query(
            `select * from contienPlat where idCommande = ?`,[idCommande]
        )
        return result;
    }catch(err){    
        console.log(err);
    }
}


//this function will return all the boisson of a specific (idCommand)
export async function selectCommandeofContienBoisson(idCommande){
    
    try{
        const [result] = await pool.query(
            `select * from contienBoisson where idCommande = ?`,[idCommande]
        )
        return result;
    }catch(err){    
        console.log(err);
    }
}