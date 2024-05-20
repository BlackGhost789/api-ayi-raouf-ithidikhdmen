import { pool } from "./connection.js";


//get all the favorited based on id client
export async function getFavoritBoissonByIdClient(idClient){
    try{
        const [row] = await pool.query(
        `select AimerBoisson.idClient,Client.nomClient,Client.prenomClient,AimerBoisson.idBoisson
        from AimerBoisson 
        inner join Client 
        on  AimerBoisson.idClient = Client.idClient and AimerBoisson.idClient = ?`, [idClient]);
        return row;
    }catch(err){
        console.log(err);
    }
}
//add a new favorit for a specific client 
export async function addFavoritBoissonByIdClient(idClient , idBoisson){
    try{
        const [row] = await pool.query(`INSERT INTO AimerBoisson (idClient, idBoisson) VALUES (?, ?)` , [idClient , idBoisson]);
        console.log(`Boisson of id ${idBoisson} added to the favorit of client ${idClient}`);
        return row;
    }catch(err){
        console.log("Error inserting favorit boisson");
        console.log(err);
    }
}
export async function deleteFavoritByIdBoisson(idClient , idBoisson){
    try{
        const [row] = await pool.query(`delete from AimerBoisson where idClient = ? and idBoisson = ?`,[idClient , idBoisson]);
    }catch(err){
            console.log("Error deleting the favorit");
         console.log(err);
    }
}