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


//get to front-end
app.get("/", (req,res) =>{
    //msg will show database is connected
    res.json({msg:"We are here!!"})
})
app.get("/index", (req,res) =>{
 res.send(`
 <h1>Let's see if this works</h1>
 <form>
    <div class="row">
        <div class="col-md-6 mt-3">
            <input type="name" class="form-control" id="name" placeholder="Name" name="name"></div>
        <div class="col-md-6 mt-3">
            <input type="email" class="form-control" id="email" placeholder="Email" name="email"></div>
        <div class="mt-3 ">
            <input type="phone" class="form-control" id="phone" placeholder="Phone number" name="phone"></div>
        </div>
            <div class="row">
                <div class=" mt-3 ">
                    <textarea type="text" class="form-control" id="text" placeholder="Message" name="message"></textarea></div>
                <div class="row display-flex justify-content-evenly">
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


app.listen(app.get("port"),() =>{
    console.log(`Listening for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
 })