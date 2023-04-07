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
    User.findOneAndUpdate({ _id: req.params.userId }, req.body)
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
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      console.log(user);
      const thoughts = await Thought.deleteMany({
        username: { $in: user.username },
      });

      !user
        ? res.status(404).json({ message: "No such user exists" })
        : res
            .status(200)
            .json({ message: "User and associated thoughts deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend
  async addFriend(req, res) {
    try {
      // add to friends array
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } }
      );

      // do it for other person
      await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $push: { friends: req.params.userId } }
      );

      !user
        ? res.status(404).json({ message: "User or friend not found" })
        : res.json({ message: "Added as friends" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Remove a friend
  async removeFriend(req, res) {
    try {
      // remove from friends array
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      );

      // do it for other person
      await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } }
      );

      !user
        ? res.status(404).json({ message: "Error. User or friend not found" })
        : res.json({ message: "Friendship is TERMINATED" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
