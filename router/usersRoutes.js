const express = require ("express")
const router = express.Router()
const con = require ("../lib/db_connection")
const bcrypt = require('bcryptjs');


// Register Route
// The Route where Encryption happens
router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";
    const {
      name,
      email,
      password
    } = req.body;

    // The start of hashing / encryption
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let user = {
      name,
      email,
      //sending the hash value to be stored within the table
      password:hash,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`User ${(user.name)} created successfully`);
    });
  } catch (error) {
    console.log(error);
  }
});

// Login
// The Route where Decryption happens
router.post("/login", (req, res) => {
  try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, async (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send("Email not found please register");
      } else {
        // Decryption
        // Accepts the password stored in database and the password given by user (req.body)
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        // If password does not match
        if (!isMatch) {
          res.send("Password incorrect");
        }
        else {
          res.send(result)
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//select single user
router.get("/:id", (req,res) =>{
    try{
        con.query(
            `SELECT * FROM users WHERE user_id = "${req.params.id}"`, 
            (err, result) => {
                if (err) throw err;
                res.json(result);
            }
        );
        } catch(error){
            console.log(error);
        };
});


//select all users
router.get("/", (req,res) =>{
    try{
        con.query("SELECT * FROM users", (err, result) =>{
            if (err) throw err;
            res.send (result);
        })
    } catch (error){
        console.log (error)
        res.status (400).send(error)
    }
});

//delete user account
router.delete('/:id', (req,res)=>{
const {user_id}=req.body
        try{
            con.query(
            `DELETE FROM users WHERE user_id="${user_id}"`, 
            (err, result) => {
                if (err) throw err;
                res.json(result);
            }
        );
        } catch(error){
            console.log(error);
        };
    })

//update user
router.put('/:id', (req, res)=>{
    const {user_id,name,email,password}= req.body
        try{
            con.query(
            `UPDATE users SET name="${name}",email="${email}",password="${password}" WHERE user_id=${user_id}`, 
            (err, result) => {
                if (err) throw err;
                res.json(result);
            }
        );
        } catch(error){
            console.log(error);
        };
    })

module.exports = router