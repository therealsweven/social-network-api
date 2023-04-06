// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.status(200).json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user document
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then(
        (user) =>
          !user
            ? res.status(404).json({ message: "No such user exists" })
            : res.status(200).json({ message: "User deleted" })
        //   Thoughts.findOneAndUpdate(
        //       { friends: req.params.userId },
        //       { $pull: { friends: req.params.userId } },
        //       { new: true }
        //     )
      )
      //   .then((course) =>
      //     !course
      //       ? res.status(404).json({
      //           message: "User deleted, but he had no friends",
      //         })
      //       : res.json({ message: "User successfully deleted" })
      //   )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a friend
  //   addFriend(req, res) {
  //     User.findOneAndUpdate({ _id: req.params.userId })
  //       .then((user) =>
  //         !user
  //           ? res.status(404).json({ message: "No such user exists" })
  //           : res.json(user)
  //       )
  //       .catch((err) => {
  //         console.log(err);
  //         res.status(500).json(err);
  //       });
  //   },

  // Remove a friend
};
