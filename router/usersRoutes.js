const express = require ("express")
const router = express.Router()
const con = require ("../lib/db_connection")

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

const bcrypt = require('bcryptjs');

// Register Route
// The Route where Encryption starts
router.post("/register", (req, res) => {
  try {
    let sql = "INSERT INTO users SET ?";
    const {
      full_name,
      email,
      password,
      user_type,
      phone,
      country,
      billing_address,
      default_shipping_address,
    } = req.body;

    // The start of hashing / encryption
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let user = {
      full_name,
      email,
      // We sending the hash value to be stored witin the table
      hash,
      user_type,
      phone,
      country,
      billing_address,
      default_shipping_address,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`User ${(user.full_name, user.email)} created successfully`);
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

module.exports = router