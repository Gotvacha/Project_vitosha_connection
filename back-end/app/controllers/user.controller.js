const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

exports.createAccount = (req, res) => {
  if (!req.body.username) {
     res.status(400).send({
        message: "Content can not be empty!"
     });
     return;
  }

  const user = {
     username: req.body.username
  };

  console.log(user);
  User.create(user)
     .then(data => {
        res.send(data);
     })
     .catch(err => {
        console.error(err);
        res.status(500).send({
           message: "Some error occurred while creating the User."
        });
     });
};

exports.findUsers = (req, res) => {
  const requestedUsername = req.params.username;
  const condition = requestedUsername ? { username: { [Op.iLike]: `%${requestedUsername}%` } } : null;

  User.findAll({ attributes: ['id', 'username', 'createdAt'], where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    });
};

exports.deleteAccount = (req, res) => {
  const username = req.params.username;// may use id for deletion

  User.destroy({
    where: { username: username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with username ${username}. Maybe the user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting user: " + err.message
      });
    });
};

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};