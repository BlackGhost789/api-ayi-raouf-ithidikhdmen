import express from "express";
import{auth} from "./privateRoute.js";
import {getAllProduit , getPlatById , getPlatsByCategories , UpdatePlatById, InsertNewProduit} from './../database/ProduitDB.js';

import { FindEmailAdmin } from "../database/AdminDB.js";

const routerProduit = express.Router();

//get all of plat
routerProduit.get("/" , auth , async (req , res) => {
    try{
        const rows = await getAllProduit();
        return res.status(200).send(rows);
    }catch(err){
        console.log(err);
    }
});

//get plat by his id
routerProduit.get("/:id" , auth , async(req , res) =>{

    try {
        const id = parseInt(req.params.id);
        const row = await getPlatById(id);
        if(row.isEmpty){return res.status(404);}
        return res.status(200).send(row);
    } catch (error) {
        console.log(err);
    }
});

//get all palts of a specific category 
routerProduit.get("/categorie/:idCategorie" , auth , async(req , res) =>{
    try {
        const id = parseInt(req.params.idCategorie);
        const row = await getPlatsByCategories(id);
        if(row.isEmpty){return res.status(404);}
        return res.status(200).send(row);
    } catch (error) {
        console.log(err);
    }
});

//update one of them by his id (only admin)
routerProduit.put("/:id", auth , async (req , res) =>{

    const email = req.user.email;
    if(!email) { return res.status(400).send("Bad request !");}
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }

    const id = parseInt(req.params.id);
    
    const nom = req.body.nom;
    const imagePlat = req.body.imagePlat;
    const prix = req.body.prix;
    const ingredient = req.body.ingredient;
    const idCategorie = req.body.idCategorie;

    //400 stand for a bad request
    if(isNaN(id)) return res.status(400);

    const row = await UpdatePlatById(id , nom , imagePlat , prix ,ingredient , idCategorie);

    if(!row){ res.status(404).send("Sorry , Produit n'exsiste pas ");}

    return res.status(200).send(row);
});

//insert a new plat to the data base (only admin)
routerProduit.post("/", auth ,async (req , res) => {
    
    const email = req.user.email;
    if(!email) { return res.status(400).send("Bad request !");}
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }


    const nom = req.body.nom;
    const imagePlat = req.body.imagePlat;
    const prix = req.body.prix;
    const ingredient = req.body.ingredient;
    const idCategorie = parseInt(req.body.idCategorie);

    if(!nom || !imagePlat || !prix || !ingredient || !idCategorie || isNaN(idCategorie) ){
        return res.status(400).send("Bad request ");
    }

    try{
        const rows = await InsertNewProduit(nom , imagePlat , parseFloat(prix) , ingredient , idCategorie);
        return res.status(201).send(rows);
    }catch(err){
        console.log(err);
    }
})


export{routerProduit};