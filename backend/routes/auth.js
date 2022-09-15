const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "xyz";

// ROUTE 1 : Create a User using: POST "/api/auth/createuser". No login required
router.post("/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" });
      }


      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      success = true;
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

// ROUTE 2: Authenticate a User using POST "/api/auth/login". No login required
router.post("/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      if (password !== user.password) {
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    }
     catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error occured");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
});


// ROUTE 4: post loggedin User Details using: POST "/api/auth/updateprofile". Login required
router.put("/updateprofile", fetchuser, async (req, res) => {
  const { name } = req.body;
  // Create a newUser object
  try {
    const newUser = {};
    if (name) {
      newUser.name = name;
    }
    // Find the user to  update it
    let userId = req.user.id;
    await User.findByIdAndUpdate(userId, { name: req.body.name });
    let user = await User.findById(userId).select("name");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occured");
  }
});


// ROUTE 4: post loggedin User Details using: POST "/api/auth/updatepassword". Login required
router.put("/updatepassword",[body("password", "Password must be atleast 5 characters").isLength({min: 5,}),],
 fetchuser, async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try
    {
        let user_password = await User.findById(req.user.id).select("password");
        if (user_password === req.body.password) {
            return res.status(400).json({ error: "new password is same as previous one" });
          }
          await User.findByIdAndUpdate(req.user.id, { password: req.body.password });
          let user = await User.findById(req.user.id);
          res.send(user);
    }
      catch (error) {
          console.error(error.message);
          res.status(500).send("Some Error occured");
        }
  });


  


module.exports = router;
