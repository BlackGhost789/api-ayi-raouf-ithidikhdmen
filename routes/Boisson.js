import express from "express";
import{auth} from "./privateRoute.js";
import { getAllBoisson , UpdateBoissonById , getBoissonById , InsertNewBoisson, getBoissonByCategories } from "../database/BoissonDB.js";
import { FindEmailAdmin } from "../database/AdminDB.js";

const routerBoisson = express.Router();

//get all of them 
routerBoisson.get("/" , auth , async (req , res) => {
    try{
        const rows = await getAllBoisson();
        return res.status(200).send(rows);
    }catch(err){
        console.log(err);
    }
});

routerBoisson.get("/categorie/:idCategorie" , auth , async(req , res) =>{
    try {
        const id = parseInt(req.params.idCategorie);
        const row = await getBoissonByCategories(id);
        if(row.isEmpty){return res.status(404);}
        console.log(row);
        return res.status(200).send(row);
    } catch (error) {
        console.log(err);
    }
});
//get boisson by his id
routerBoisson.get("/:id" , async(req , res) =>{
    try {
        const id = parseInt(req.params.id);
        const row = await getBoissonById(id);
        if(row.isEmpty){return res.status(404);}
        return res.status(200).send(row);
    } catch (error) {
        console.log(err);
    }
});

//update one of them by his id (only admin)
routerBoisson.put("/:id",auth,async (req , res) =>{

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
    const imageBoisson = req.body.imagePlat;
    const prix = req.body.prix;
    const idCategorie = req.body.idCategorie;

    //400 stand for a bad request
    if(isNaN(id)) return res.status(400);

    const row = await UpdateBoissonById(id , nom , imageBoisson , prix  , idCategorie);

    if(!row){ res.status(404).send("Sorry , Boisson n'exsiste pas ");}

    return res.status(200).send(row);
});

//insert a new plat to the data base (only admin)
routerBoisson.post("/",auth,async (req , res) => {
        
    const email = req.user.email;
    if(!email) { return res.status(400).send("Bad request !");}
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }


    const nom = req.body.nom;
    const imageBoisson = req.body.imageBoisson;
    const prix = req.body.prix;
    const idCategorie = parseInt(req.body.idCategorie);

    if(!nom || !imageBoisson || !prix  || !idCategorie || isNaN(idCategorie) ){
        return res.status(400).send("Bad request ");
    }

    try{
        const rows = await InsertNewBoisson(nom , imageBoisson , parseFloat(prix) , idCategorie);
        return res.status(201).send(rows);
    }catch(err){
        console.log(err);
    }
})

export{routerBoisson};