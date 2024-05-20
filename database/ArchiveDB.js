import { pool } from "./connection.js";

export async function InsertActeur(email, role ){
    try{
    const [result]  = await pool.query(`
    Insert into archive 
    (email, rote) 
     values 
    (?, ? )`,[email , role]);

    console.log("[+] new Acteur added to the data base ");
    return result;

    }catch(err){
        console.log("[-] Error inserting the new Acteur to the data base ");
        console.log(err);
    }
}

export async function FindEmailActeur(email){
    const [result] = await pool.query("Select * from archive where email = ?" , [email]);
    return result;   
}


