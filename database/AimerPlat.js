import { pool } from "./connection.js";


//get all the favorited based on id client

export async function getFavoritPlatByIdClient(idClient){
    try{
        const [row] = await pool.query(
            `select AimerPlat.idClient , Client.nomClient ,Client.prenomClient ,  AimerPlat.idPlat
            from AimerPlat 
            inner join Client 
            on  AimerPlat.idClient = Client.idClient and AimerPlat.idClient = ?`
            , [idClient]);
        return row;
    }catch(err){
        console.log(err);
    }
}

//add a new favorit for a specific client 

export async function AddFavoritPlatByIdClient(idClient , idPlat){
    try{
        const [row] = await pool.query(`INSERT INTO AimerPlat (idClient, idPlat) VALUES (?, ?)` , [idClient , idPlat]);
        console.log(`Plat of id ${idPlat} added to the favorit of client ${idClient}`);
        return row;
    }catch(err){
        console.log("Error inserting favorit Plalt");
        console.log(err);
    }
}

export async function deleteFavoritByIdPlat(idClient , idPlat){
    try{
        const [row] = await pool.query(`delete from AimerPlat where idClient = ? and idPlat = ?`,[idClient , idPlat]);
        return row;
    }catch(err){
         console.log(err);
    }
}









//delete a favorit of a specific client