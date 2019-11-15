const router = require('express').Router();
const UsersModel = require('./auth-models')
const bcrypt = require('bcryptjs')



router.post('/register', (req, res) => {
  // implement registration
  let creds = req.body

  const hash = bcrypt.hashSync(creds.username, 8);
  creds.password = hash

  UsersModel.add(creds)
  .then(saved => {
    //#4.add cookie after registration, so will not need to log in again
    req.session.username = saved.username  
    res.status(201).json(saved)
  })
  .catch(err => {
    res.status(500).json(err)
  })

});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body
  
  UsersModel.findBy({username})
    .first()
    .then(user => {
    if(user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username //#4.add cookie to object
        console.log(`req`,req.session.username)
      res.status(200).json({
        message: `Welcome ${user.username}!`,
      })
   } else {
     res.status(401).json({message: 'Invalid Credentials'})
     }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

router.get("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(error => {
        if (error) {
          res
            .status(500)
            .json({
              message:
                "you can check out any time you like, but you can never leave..."
            });
        } else {
          res.status(200).json({ message: "logged out successfully" });
        }
      });
    } else {
      res.status(200).json({ message: "bye bye" });
    }
})

module.exports = router;