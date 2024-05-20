import {getClients , InsertClient , getEmailByid , deleteClientById , FindPassword , getClientsById, updateClientById , getIdByEmail} from "../database/ClientDB.js";
import { getAdmin , getAdminByHisId  , FindEmailAdmin , FindPasswordAdmin,InsertNewAdmin  } from "../database/AdminDB.js";
import { getAllLivreur , InsertNewLivreur , FindEmailLivreur , FindPasswordLivreur } from "../database/LivreurDB.js";
import { InsertActeur , FindEmailActeur } from "../database/ArchiveDB.js";

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "./privateRoute.js";


const router = express.Router();


//path to get all client  (only admin)
router.get("/client" , auth ,  async (req , res) => {

    //get email of the user 
    const email = req.user.email;
    console.log(email);
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin fuck you");
        return res.status(403).send("access denied !");
    }

    const row = await getClients();
    return res.status(200).send(row);
})

//path to get a specific client (only the admin and the client with that id)
router.get("/client/:id" , auth , async (req , res) =>{

    //here i can give the acces to the admin or the client with this is 
    //what i can do is find compare the email in the token and the email of this id user 
    //if are the same i will give him acces other wise 
    //get email of the user 
    
    const id = parseInt(req.params.id);
        
    if(isNaN(id)) return res.status(400).send({msg : "please enter a valid id"});

    const EmailClient = await getEmailByid(id);

    const email = req.user.email;

    if(!email || !EmailClient[0]){
        return res.status(400).send("Bad request");
    }

    const isAdmin = await FindEmailAdmin(email);

    if(!isAdmin && !(email == EmailClient[0].emailClient)){
         console.log("You are not admin fuck you");
         return res.status(403).send("access denied !");
    }

    try{
       
        const row = await getClientsById(id);
      
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

//path to register a new client
router.post("/client/register", async (req , res) => {

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = req.body.password;

    if(!nom || !prenom || !email || !password){
        return res.status(400).send("Bad Request !");
    }

    //haching the password
    const salt = await bcrypt.genSalt(10);
    const hackPassword = await bcrypt.hash(password , salt);
    
    try{
        await InsertClient(nom,prenom,email,hackPassword);
        await InsertActeur(email , "Client");
        console.log("[+] New user has been added to the data base ");
        res.status(201).send({nom , prenom  , email  ,  hackPassword});
    }catch(err){
        res.status(400).send(err);
    }
});

//path to update client information
router.put("/client/edit" , auth ,  async (req , res) =>{
    const Clientid = req.user.id;
    const newName = req.body.name;
    const newPrenom = req.body.prenom;

    if(!newName || !newPrenom ){
        return res.status(400).send("Please enter a valid data !");
    } 

    try{
        const row = await updateClientById(Clientid , newName , newPrenom);
        console.log("[+] Client has updated his data successfully");
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

//path to delete a client with this id (only admin can delete)
router.delete("/client/delete" , auth , async (req , res) =>{

        const email = req.user.email;
        if(!email) { return res.status(400).send("Bad request !");}
        console.log(email);
        const isAdmin = await FindEmailAdmin(email);
        if(!isAdmin){
            console.log("You are not admin");
            return res.status(403).send("access denied !");
        }

        try{
            const idClient = req.user.id;
            const row = await deleteClientById(idClient);
            console.log("[-] Client has been removed from the data base");
            return res.status(200).send("Client with id " + idClient +" has removed !");
        }catch(err){
            console.log("[-] Error deleting Client from data base");
            console.log(err);
        }
});



//path to login as client
router.post("/login" , async (req , res)=>{

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(400).send("Bad request");
    }

    //validation des donees 
    const Acteur = await FindEmailActeur(req.body.email);
    if(Acteur.length == 0){return res.status(400).send("person dont exsist");}

    console.log(Acteur);

    if(Acteur[0].rote == "Admin"){
        //validation des donees 
        const cheakEmail = await FindEmailAdmin(req.body.email);
        if(!cheakEmail){return res.status(400).send("Email dont exsist");}
        //password from the db
        const passwordDb = await FindPasswordAdmin(email);
        if(!passwordDb) return res.status(400).send("Invalid Email or Password");
        //check if the password is valid 
        const validPass = await bcrypt.compare(password , passwordDb);
        if(!validPass){return res.status(400).send("Password is not correct");}
        //create and give a token 
        const user = {
            email : email,
            role : "Admin"
        }
        const token = jwt.sign( user , "randomPasswordTokenHelloworldRaoufTouati");
        res.header('auth-token' , token).send({"token" : token , "role" : user.role});
        console.log("Admin has logged in ");

    }else if(Acteur[0].rote == "Client"){
        //password from the db
        const passwordDb = await FindPassword(email);
        if(!passwordDb) return res.status(400).send("Invalid Email or Password");
        //check if the password is valid 
        const validPass = await bcrypt.compare(password , passwordDb);
        if(!validPass){return res.status(400).send("Password is not correct");}
        //here i need to get the id of the user based on his email
        const idUser = await getIdByEmail(email);
        if(!idUser){return res.status(500).send({msg : "Sorry Error on the back end"});}
        //create and give a token 
        const user = {
            id : idUser[0].idClient,
            email : email,
            role : "Client"
        }
        console.log("client has logged in ");
        const token = jwt.sign(user , "randomPasswordTokenHelloworldRaoufTouati");
        return res.header('auth-token', token).send({"token" : token , "role" : user.role});    
    }else if(Acteur[0].rote == "Livreur"){

          //password from the db
          const passwordDb = await FindPasswordLivreur(email);
          if(!passwordDb) return res.status(400).send("Invalid Email or Password");
          //check if the password is valid 
          const validPass = await bcrypt.compare(password , passwordDb);
          if(!validPass){return res.status(400).send("Password is not correct");}

          //create and give a token 
          const user = {
              email : email,
              role : "Livreur"
          }

          console.log("Livrerur has logged in !");
          const token = jwt.sign(user , "randomPasswordTokenHelloworldRaoufTouati");
          return res.header('auth-token', token).send({"token" : token , "role" : user.role});    
    } 
});

//path to get all the admin (only admins)
router.get("/admin" , auth , async (req , res) => {

     //get email of the user 
    const email = req.user.email;
    const isAdmin = await FindEmailAdmin(email);
    if(!isAdmin){
        console.log("You are not admin");
        return res.status(403).send("access denied !");
    }

    try{
        const row = await getAdmin();
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

//path to see a specific admin (only admin)
router.get("/admin/:id" , auth , async (req , res) => {
    const id = parseInt(req.params.id);
        
    if(isNaN(id)) return res.status(400).send({msg : "please enter a valid id"});

    const EmailClient = await getEmailByid(id);

    const email = req.user.email;

    if(!email || !EmailClient[0]){
        return res.status(400).send("Bad request");
    }

    const isAdmin = await FindEmailAdmin(email);

    if(!isAdmin && !(email == EmailClient[0].emailClient)){
         console.log("You are not admin fuck you");
         return res.status(403).send("access denied !");
    }

    try{
        const row = await getAdminByHisId(id);
        return res.status(200).send(row);
    }catch(err){
        console.log(err);
    }
});

//path to add a new admin 
router.post("/admin/register" , async (req , res) => {

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = req.body.password;

    if(!nom || !prenom || !email || !password){
        return res.status(400).send("Bad Request !");
    }

    //hacking the password
    const salt = await bcrypt.genSalt(11);
    const hackPassword = await bcrypt.hash(password , salt);
    
    try{
        await InsertNewAdmin(nom,prenom,email,hackPassword);
        await InsertActeur(email , "Admin");
        console.log("[+] New Admin and Acteur has been added to the data base");
        res.status(201).send({nom , prenom  , email  ,  hackPassword});
    }catch(err){
        res.status(400).send(err);
    }
});

router.get("/livreur" , auth , async(req , res) => {

     //get email of the user 
    const emailUser = req.user.email;
    console.log(emailUser);
    const isAdmin = await FindEmailAdmin(emailUser);
    if(!isAdmin){
        console.log("You are not admin fuck you");
        return res.status(403).send("access denied !");
    }

    try{
        const row = await getAllLivreur();
        return res.status(201).send(row);
    }catch(err){
        res.status(500).send(err);
        console.log(err);
    }
})

router.post("/livreur/register" , auth , async (req , res) => {
       
    //get email of the user 
    const emailUser = req.user.email;
    console.log(emailUser);
    const isAdmin = await FindEmailAdmin(emailUser);
    if(!isAdmin){
        console.log("You are not admin fuck you");
        return res.status(403).send("access denied !");
    }

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = req.body.password;

    if(!nom || !prenom || !email || !password){
        return res.status(400).send("Bad Request !");
    }

    //haching the password
    const salt = await bcrypt.genSalt(10);
    const hackPassword = await bcrypt.hash(password , salt);
    
    try{
        const row = await InsertNewLivreur(nom , prenom , email , hackPassword , true);
        console.log("[+] New Livreur has been added to the data base ");
        res.send({nom , prenom  , email  ,  hackPassword});
    }catch(err){
        res.status(400).send(err);
    }



})


export{router};