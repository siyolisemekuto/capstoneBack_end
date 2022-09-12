const express = require ("express")
const router = express.Router()
const con = require ("../lib/db_connection")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const middleware = require("../middleware/auth");
const nodemailer = require('nodemailer');


// Register Route
// The Route where Encryption happens
router.post("/register", (req, res) => {
  res.setHeader('Access-Control-Allow-Methods','POST');

  try {
    let sql = "INSERT INTO users SET ?";
    const {
      name,
      email,
      password,
      user_type,
      image
    } = req.body;

    // The start of hashing / encryption
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let user = {
      name,
      email,
      user_type,
      //sending the hash value to be stored within the table
      password:hash,
      image
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
        const isMatch = await bcrypt.compare(
          req.body.password,
          result[0].password
        );
        if (!isMatch) {
          res.send("Password incorrect");
        } else {
          // The information the should be stored inside token
          const payload = {
            user: {
              user_id: result[0].user_id,
              name: result[0].name,
              email: result[0].email,
            },
          };
          // Creating a token and setting expiry date
          jwt.sign(
            payload,
            process.env.jwtSecret,
            {
              expiresIn: "365d",
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// Verify
router.get("/verify", (req, res) => {
  const token = req.header("x-auth-token");
  jwt.verify(token, process.env.jwtSecret, (error, decodedToken) => {
    if (error) {
      res.status(401).json({
        msg: "Unauthorized Access!",
      });
    } else {
      res.status(200);
      res.send(decodedToken);
    }
  });
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
router.get("/",middleware, (req,res) =>{
  if (req.user.user_type == "admin"){
    try{
        con.query("SELECT * FROM users", (err, result) =>{
            if (err) throw err;
            res.send (result);
        })
    } catch (error){
        console.log (error)
        res.status (400).send(error)
    }
  }else{
    res.send("Access denied")
  }
});


//delete user account
router.delete('/:id/delete', (req,res)=>{
        try{
            con.query(
            `DELETE FROM users WHERE user_id=${req.params.id}`, 
            (err, result) => {
                if (err) throw err;
                res.json(result);
            }
        );
        con.query( (err, result) => {
          if (err) throw err;
          if(result === 0) {
            res.status(400), res.send("Email not found")
          }
          else {
    
            // Allows me to connect to the given email account || Your Email
            const transporter = nodemailer.createTransport({
              host: 'smtp.ethereal.email',
              port: 587,
              auth: {
                  user: 'maia.sipes47@ethereal.email',
                  pass: 'nEmPHqWsCJHWW9N2Nu'
              }
          });
    
            // How the email should be sent out
          var mailData = {
            from: process.env.MAILERUSER,
            // Sending to the person who requested
            to: result[0].email,
    
            subject: 'Password Reset',
            html:
              `<div>
                <h3>Hi ${result[0].name},</h3>
                <br>
                <h4>Click link below to reset your password</h4>
    
                <a href="http://localhost:3000/reset-psw-form/${result[0].user_id}">
                  Click Here to Reset Password
                  user_id = ${result[0].user_id}
                </a>
                <div>
                  Email: ${process.env.MAILERUSER}
                <div>
              </div>`
          };
    
          // Check if email can be sent
          // Check password and email given in .env file
          transporter.verify((error, success) => {
            if (error) {
              console.log(error);
            } else {
              console.log('Email valid! ', success)
            }
          });
    
          transporter.sendMail(mailData,  (error, info) => {
            if (error) {
              console.log(error);
            } else {
              res.send('Please Check your email', result[0].user_id)
            }
          });
    
          }
        });
        
        } catch(error){
            console.log(error);
        };
        
        
    })

//update user
router.patch('/:id/edit', (req, res)=>{
    const {name,email}= req.body
        try{
            con.query(
            `UPDATE users SET name="${name}",email="${email}" WHERE user_id=${req.params.id}`, 
            (err, result) => {
                if (err) throw err;
                res.json(result);
            }
        );
        } catch(error){
            console.log(error);
        };
    })

//forgot password with nodemailer
router.post('/forgot-psw', (req, res) => {
    try {
    let sql = `SELECT * FROM users WHERE ?`
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      if(result === 0) {
        res.status(400), res.send("Email not found")
      }
      else {

        // Allows me to connect to the given email account || Your Email
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
              user: 'maia.sipes47@ethereal.email',
              pass: 'nEmPHqWsCJHWW9N2Nu'
          }
      });

        // How the email should be sent out
      var mailData = {
        from: process.env.MAILERUSER,
        // Sending to the person who requested
        to: result[0].email,

        subject: 'Password Reset',
        html:
          `<div>
            <h3>Hi ${result[0].name},</h3>
            <br>
            <h4>Click link below to reset your password</h4>

            <a href="http://localhost:3000/reset-psw-form/${result[0].user_id}">
              Click Here to Reset Password
              user_id = ${result[0].user_id}
            </a>
            <div>
              Email: ${process.env.MAILERUSER}
            <div>
          </div>`
      };

      // Check if email can be sent
      // Check password and email given in .env file
      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email valid! ', success)
        }
      });

      transporter.sendMail(mailData,  (error, info) => {
        if (error) {
          console.log(error);
        } else {
          res.send('Please Check your email', result[0].user_id)
        }
      });

      }
    });
  } catch (error) {
    console.log(error);
  }
})


// Reset Password Route
router.put('/reset-psw/:id', (req, res) => {
  try {
    let sql = `SELECT * FROM users WHERE ?`;
    let user = {
      user_id: req.params.id,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      if (result === 0) {
        res.status(400), res.send("User not found");
      } else {
        let newPassword = `UPDATE users SET ? WHERE user_id=${req.params.id}`;
  
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
  
        const updatedPassword = {
          name: result[0].name,
          email: result[0].email,
          // Only thing im changing in table
          password: hash,
        };
  
        con.query(newPassword, updatedPassword, (err, result) => {
          if (err) throw err;
          console.log(result);
          res.send("Password Updated please login");
        });
      }
    });
  } catch (error) {
    alert(error);
    res.status(400).send(error)
  }

})


module.exports = router