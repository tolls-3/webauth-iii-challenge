const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
  const { sub, department } = req.decodedToken;
  if (department === "admin") {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    Users.findById(sub)
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
});

module.exports = router;
