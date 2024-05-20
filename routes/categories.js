import express from "express";
const categorieRouter  = express.Router();

import{auth} from "./privateRoute.js";
import { getAllCategories , InsertNewCategories , getCategorieById} from "../database/categorieDB.js";
import { FindEmailAdmin } from "../database/AdminDB.js";

//end point to get all categories 
categorieRouter.get('/' , auth , async (req , res) => {
    try{
        const row = await getAllCategories();
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

//path to add a new categorie (Only admin)
categorieRouter.post("/" , auth , async (req , res) => {

    const email = req.user.email;
    if(!email) { return res.status(400).send("Bad request !");}
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }

    const nom_categorie = req.body.nomCategorie;
    const image_categorie = req.body.imageCategorie;

    try{
        const row = await InsertNewCategories(nom_categorie , image_categorie);
        console.log("[+] New Categorie inserted succesfully");
        return res.status(201).send(row);
    }catch(err){
        console.log(err);
    }
});

//end point to see a specific categorie 
categorieRouter.get('/:id' , auth , async (req , res) =>{
    try {
        const id = parseInt(req.params.id);

        if(isNaN(id)) return res.status(400);

        const row = await getCategorieById(id);

        return res.status(200).send(row);

    } catch (error) {
        console.log(error);
    }
})

export{categorieRouter};