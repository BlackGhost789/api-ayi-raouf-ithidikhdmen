import express from "express";
const LivreurRouter  = express.Router();

import { auth } from "./privateRoute.js";
import { getAllLivreur , UpdateLivreurById  , deleteLivreurById, getDisponibleLivreur , InsertNewLivreur  , ChangeStateOfLivreur, getCommandeOfLivreur, FindEmailLivreur, FindLivreurByEmail} from "../database/LivreurDB.js";
import { FindEmailAdmin } from "../database/AdminDB.js";
import { InsertActeur , FindEmailActeur } from "../database/ArchiveDB.js";

//path to get all livreeur 
LivreurRouter.get("/" , auth , async (req , res) => {
    try{
        const row = await getAllLivreur();
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

//path to add a new livreur (only admins) 
LivreurRouter.post("/" , auth ,  async (req, res) => {

    const email = req.user.email;
    if(!email) { return res.status(400).send("Bad request !");}
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){

        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }
    
    try{
        const nom = req.body.nom;
        const prenom = req.body.prenom; 
        const password = req.body.password;
        const email = req.body.email;
        const disponible = req.body.disponible;

        const row = await InsertNewLivreur(nom , prenom  , email, password , disponible);
        const row2 = await InsertActeur(email , "Livreur");
        //status of 201 (new ressurce has been created)
        return res.status(201).send(row);

    }catch(err){
        console.log(err);
    }
});

//path to see livreur disponibles (only admin)
LivreurRouter.get("/disponible" ,auth ,  async (req , res) =>{

    const email = req.user.email;
    if(!email) { return res.status(400).send("Bad request !");}
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }

    try{
        const row = await getDisponibleLivreur();
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

//end point to change the state of an livreur with his id (only admin)
LivreurRouter.patch("/changeState/:id" , auth , async (req , res) => {
    
    const email = req.user.email;
    if(!email) { return res.status(400).send("Bad request !");}
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }

    try {

        const idLivreur = parseInt(req.params.id);
        const newstate = req.body.disponible;
        if(isNaN(idLivreur)){
            return res.status(400).send({msg : "Bad Request !"});
        }
        const row = await ChangeStateOfLivreur(idLivreur , newstate);
        console.log(`Livreur with id ${idLivreur} changed his state to ${newstate}`);
        if(!row) {return req.state(400).send({msg : "Error updating Livreur"});}
        return res.status(200).send(row);

    } catch (error) {
        console.log(error);
    }
});

//path to update Livreur information
LivreurRouter.put("/edit" , auth ,  async (req , res) =>{
    const LivrerurID = req.user.id;
    const newName = req.body.name;
    const newPrenom = req.body.prenom;

    if(!newName || !newPrenom ){
        return res.status(400).send("Please enter a valid data !");
    } 
    try{
        const row = await UpdateLivreurById(LivrerurID , newName , newPrenom);
        console.log("[+] Livreur has updated his data successfully");
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

LivreurRouter.get("/commande" , auth , async (req , res) => {
    //get the id of the livreur
    const LivrerurEmail = req.user.email;
    const livreur = await FindLivreurByEmail(LivrerurEmail);
    try{
        const row = await getCommandeOfLivreur(livreur.idLivreur);
        console.log(`this is result ${row}`);
        return res.status(200).send(row);
    }catch(err){   
        console.log(err);
    }
});

//path to delete a livreur
LivreurRouter.delete("/delete" , auth , async (req , res) => {
    try {
        const idLivreur = req.user.id;
        const row = await deleteLivreurById(idLivreur);
        console.log(`[+] Livreur with id ${idLivreur} has been removed from DataBase`);
    } catch (error) {
        console.log("Error deleting Livreur");
        console.log(error);
    }
});


export{LivreurRouter};