const express = require ("express")
cors = require ("cors")
const app = express()
//app must get data from this port aka plug
app.set("port", process.envPORT || 3000)
//aka cable
app.use(express.json());
//shares resources across origins therefore allows process
app.use(cors())

//importing routes
const usersRoutes = require ("./router/usersRoutes")

//get to front-end
app.get ("/", (req,res) =>{
    //msg will show database is connected
    res.json({msg:"We are here!!"})
})

//implementation of routes
//route link (this file for this url)
app.use ("/users", usersRoutes)

app.listen(app.get("port"),() =>{
    console.log(`Listening for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
 })