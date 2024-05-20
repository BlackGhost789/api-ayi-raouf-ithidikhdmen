import express from "express";
const commandRouter  = express.Router();

import { auth } from "./privateRoute.js";
import { getAllCommande , getComamndeById , getAllCommandeLivre ,changeStateOfCommandeByIdCommande , UpdateLivreurOfACommande , insertnewCommande  , DeleteCommandeById, getCommandeOfidClient} from "../database/CommandeDB.js";
import { FindEmailAdmin } from "../database/AdminDB.js";
import { ChangeStateOfLivreur } from "../database/LivreurDB.js";
import { insertContienPlat , insertContienBoisson } from "../database/contien.js";
import { selectCommandeofContienBoisson , selectCommandeofContienPlat   } from "../database/contien.js";


//here only the admin can see the all the commandes 
commandRouter.get("/" , auth , async (req , res) => {

    const email = req.user.email;
    if(!email) { return res.status(400).send("Bad request !");}
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }
    try{
        const row = await getAllCommande();
        if(!row) {return res.status(404).send({msg : "no Commande availible in the data base"});}
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

commandRouter.get("/myCmd" , auth , async (req , res) => {

    const id = req.user.id;

    //i can add this for the admin to see the commands by not now
    /*const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin && !(email == EmailClient[0].emailClient)){
         console.log("You are not admin ");
         return res.status(403).send("access denied !");
    }*/

    try{  
        const rows = await getCommandeOfidClient(id);
        ///here rows is a list of all commande of a client 
        //so we need to loop after all the command and get the contien of each command
        let list = [];
        for(let i = 0 ; i < rows.length ; i++){
            list.push({
                "commande" : rows[i],
                "plat" : await selectCommandeofContienPlat(rows[i].idCommande),
                "boisson" : await selectCommandeofContienBoisson(rows[i].idCommand)
            });
        }
        if(!rows) return res.status(404).send({msg : "not found"});
        return res.status(200).send(list);
    }catch(err){
        console.log(err);
    }
});

//end point to get all the commande with status delivred (true)
commandRouter.get("/commandeLivre" , auth , async (req , res) =>{

    const email = req.user.email;
    if(!email) { return res.status(400).send("Bad request !");}
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }

    try{
        const [row] = await getAllCommandeLivre();
        if(!row) {return res.status(404).send({msg : "no Commande has been livred yet"});}
        console.log(row)
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

//here is for the admin to validate a commande for a specific livreur 
//the status will be zero by default so we dont need to change the value of the statue 
//give a commande to a specific liveur by id (only admin)
commandRouter.post("/validate" , auth , async (req , res) => {

    //here only the admin can go with this router 
    const email = req.user.email;

    if(!email) { return res.status(400).send("Bad request !");}
    //console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }

    //get the two cata from the request body
    const idCommand  = req.body.idCommand;
    const idLivreur  = req.body.idLivreur;

    //here we need to get the commande and update the id of the livreur 
    //here when the admin make a livreur go to a commande we need to change his state to 
    //not disponible i mean 0 

    try{
        const row = await UpdateLivreurOfACommande(idCommand , idLivreur);
        if(row){
         const row2 = await ChangeStateOfLivreur(idLivreur , false);
        }
        if(!row2) return res.status(500).send({msg : "Error on the data base"});
        console.log("Livrerur " + idLivreur + "go for the commande" + idCommand);
        return res.status(200);
    }catch(err){
        console.log(err);
    }

});

//get a specific command by his id (only admin)
commandRouter.get("/:id" ,auth , async (req , res) => {

    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send({msg : "Bad request , Invalid"});
    }

    const email = req.user.email;
    const idUserLoggedIn = parseInt(req.user.id);
    
    //if(!email) { return res.status(400).send("Bad request !");}
    //console.log(email);
    //const isAdmin = await FindEmailAdmin(email);
    //if(!isAdmin && id != idUserLoggedIn){
    //    console.log("You are not admin");
    //    return res.status(403).send("access denied !");
    //}

    try {
        const row = await getComamndeById(id);
        const row2 = await selectCommandeofContienPlat(id);
        const row3 = await selectCommandeofContienBoisson(id);

        if(row.length == 0 || row2.length == 0) return res.status(404).send("No Command was found");
        return res.send({
            "command" : row,
            "plat" : row2,
            "boisson" : row3
        });

    } catch (error) {
        console.log(error);
    }
});

//end point to insert a new Commande ()
//for this middelware i think the client can insert a command and send it to the client 
//so there is only one authontification that the user is logged in
commandRouter.post("/" , auth , async(req , res) => {
    try{
        const idClient = req.user.id;
        const location = req.body.location;
        const date = req.body.date;
        //here for now we will set the livreur id to null after that
        //the admin will chose how will be responsible for this commande 
        const id_Livreur = req.body.id_Livreur;

        //get a table of all the commande of the client 
        const listCommandePlat = req.body.listCommandePlat;
        const listCommandeBoisson = req.body.listCommandeBoisson;

        //here we will insert the command to the data base 
        const row = await insertnewCommande(location , date , idClient , id_Livreur);

        //here we will get the id of that command 
        const CommandId = row["insertId"];

        listCommandePlat.forEach(async element => {
            const idPlat = element.idPlat;
            const quantite = element.quantite;
            //here if there is a value for the palt we will insert it to the data base of this if of the command
            if(!idPlat){
            }else{
                const row2 = await insertContienPlat(CommandId , idPlat  , quantite);                
            }
        });


        listCommandeBoisson.forEach(async element => {
            const idBoisson = element.idBoisson;
            const quantite = element.quantite;
            //here if there is a value for the palt we will insert it to the data base of this if of the command
            if(!idBoisson){
            }else{
                const row2 = await insertContienBoisson(CommandId , idBoisson  , quantite);                
            }
        });



        console.log("[+] new commande has been created to the db for the client with id " + idClient);
        return res.status(201).send(row);
    }catch(err){
        console.log(err);
    }
});

//get command of a specific client (only admin or the client can see his commands)
//delete a specific command with here id (only admin)
//here this router dont delete any command but just make the livreur disponible
commandRouter.delete("/:id" , auth , async(req,  res) =>{

    try {
        const id = parseInt(req.params.id);

        if(isNaN(id)){return res.status(400).send({msg : "bad request "});}

        //here we delete a specifi commande by here id 
        //we need to change the state of the livreur that is responsible for this commande 
        const [row] = await getComamndeById(id);
        if(!row){
           return res.status(404).send({msg : "Command dont exsist "});
        }

        //get the idofLivreur of the commande 
        if(row.idLivreur != null){
            const idLivreur = row.idLivreur;
            //change the state of this livreur (make him disponbile)
            const row2 = await ChangeStateOfLivreur(idLivreur , true); 
            //change the state of the commande to status livred 
            const row3 = await changeStateOfCommandeByIdCommande(id , true);  
        }
        //if you want to delete a command just remove the comment below this line 

        //const row2 = await DeleteCommandeById(id);
        console.log(`[+] The commande with id ${id} has been succesfully deleted !`);
        return res.status(200).send('deleted');
    } catch (error) {
        console.log(error);
    }
})

export{commandRouter};