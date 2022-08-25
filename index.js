const express = require("express")
cors = require("cors")
const app = express()
//app must get data from this port aka plug
app.set("port", process.env.PORT || 3000)
//aka cable
app.use(express.json());
//shares resources across origins therefore allows process
app.use(cors())

//importing routes
const usersRoutes = require("./router/usersRoutes");
const moodsRoutes = require("./router/moodsRoutes");

//get to front-end
app.get("/", (req,res) =>{
    //msg will show database is connected
    res.json({msg:"We are here!!"})
})
app.get("/index", (req,res) =>{
 res.send(`
 <h1>Create a new password</h1>
 <form>
    <div class="row">
        <div class="col-md-6 mb-3">
            <input type="email" class="form-control" placeholder="Email">
        </div>
        <div class="col-md-6 mb-3">
            <input type="password" class="form-control" placeholder="New password">
        </div>
        <div class="col-auto mt-3 mb-3">
            <button type="submit" class="btn" id="submit">Send Message</button>
        </div>
    </div>
</form>
 `)
})

//implementation of routes
//route link (this file for this url)
app.use("/users", usersRoutes);
app.use("/users", moodsRoutes);


app.listen(app.get("port"),() =>{
    console.log(`Listening for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
 })