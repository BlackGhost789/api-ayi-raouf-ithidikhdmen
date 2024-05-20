
import express from "express";
const favoritRoute  = express.Router();

import { AddFavoritPlatByIdClient , deleteFavoritByIdPlat , getFavoritPlatByIdClient } from "../database/AimerPlat.js";
import { addFavoritBoissonByIdClient , deleteFavoritByIdBoisson , getFavoritBoissonByIdClient } from "../database/AimerBoisson.js";
import { auth } from "./privateRoute.js";


//path to get favorit of a specific client

favoritRoute.get("/" , auth , async (req , res) =>{
    const idClient = req.user.id;
    if(!idClient) return res.status(404).send("No favorit for now");
    const rows = await getFavoritPlatByIdClient(idClient);
    const rows2 = await getFavoritBoissonByIdClient(idClient);

    return res.status(200).send({
        "plat" : rows,
        "Boisson" : rows2
    });
}); 

//path to add a new favorit for a specific client 
favoritRoute.post("/favPlat" , auth , async (req , res) =>{
    const idClient = req.user.id;
    const idPlat = req.body.idPlat;
    console.log(req.body);
    try{
        const row = await AddFavoritPlatByIdClient(idClient , idPlat);
        console.log(`[+] client ${idClient} added ${idPlat} plat to his favorit`);
        return res.status(400).send(row);
    }catch(err){
        console.log("Error inserting favorit");
        console.log(err);
    }
});

favoritRoute.delete("/deltFavPlat" , auth , async (req, res) =>{
    try {
        const idClient = req.user.id;
        const idPlat = req.body.idPlat;

        const row = await deleteFavoritByIdPlat(idClient , idPlat);
        
        return res.status(204).send("[+] item has been removed from favorit");


    } catch (error) {
        console.log(error);   
    }
});



favoritRoute.post("/favBoisson" , auth , async (req , res) =>{
    const idClient = req.user.id;
    const idBoisson = req.body.idBoisson;
    try{
        const row = await addFavoritBoissonByIdClient(idClient , idBoisson);
        console.log(`[+] client ${idClient} added ${idBoisson} Boisson to his favorit`);
        return res.status(201).send('added');
    }catch(err){
        console.log("Error inserting favorit Boisson");
        console.log(err);
    }
});



favoritRoute.delete("/deltFavBoisson" , auth , async (req, res) =>{
    try {
        const idClient = req.user.id;
        const idBoisson = req.body.idBoisson;
        console.log(idBoisson);

        const row = await deleteFavoritByIdBoisson(idClient , idBoisson);

        return res.status(204).send("[+] item has been removed from favorit");


    } catch (error) {
        console.log(error);   
    }
});



export{favoritRoute};