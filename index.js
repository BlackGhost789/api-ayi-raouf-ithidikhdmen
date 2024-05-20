import expres from "express";
import bodyParser from "body-parser";
import { createServer } from "node:http";
import { Server } from "socket.io";
import {dirname} from "path";

const app = expres();
const server = createServer(app);
const io = new Server(server);

const port = 8080;

app.use(bodyParser.json());

//import route
import {router} from "./routes/Auth.js";
import {routerProduit} from "./routes/menu.js";
import {categorieRouter} from "./routes/categories.js";
import {commandRouter} from "./routes/Commande.js";
import {LivreurRouter } from "./routes/Livreur.js";
import { routerBoisson } from "./routes/Boisson.js";
import { favoritRoute } from "./routes/favorit.js";


//client et livreur
app.use("/api/" , router);
app.use("/api/livreur" , LivreurRouter);
//plat avec les boisson
app.use("/api/plat" , routerProduit);
app.use("/api/boisson" , routerBoisson);
//les categories
app.use("/api/categories" , categorieRouter);
//les commande
app.use("/api/commande" , commandRouter);
//les favorit 
app.use("/api/fav" , favoritRoute);

app.get("/" , (req , res) => {
    res.send("Home page");
});


app.get("/image/:category/:nom", (req, res) => {
    //console.log(__dirname);
    const dir = '/media/kali/0e2ed0e1-e4cb-41f4-ba28-3cda11754704/project/API-final-master/images/';
    const nom = req.params.nom;
    const category = req.params.category;
    res.sendFile(`${dir}/${category}/${nom}`)
});


//try to implement the websocket io 
io.on('connection', (socket) => {
    console.log('a user connected');
});


server.listen(port , () => {console.log("Open server at port 8080")});
