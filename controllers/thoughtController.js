// getThoughts,
// getSingleThought,
// createThought,
// updateThought,
// deleteThought,
// createReaction,
// deleteReaction,

const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        return res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .lean()
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
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

  // Create a new Reaction
  createReaction(req, res) {
    // Thought.create(req.body)
    //   .then((thought) => res.json(thought))
    //   .catch((err) => res.status(500).json(err));
  },
  // Create a new Reaction
  deleteReaction(req, res) {
    // Thought.create(req.body)
    //   .then((thought) => res.json(thought))
    //   .catch((err) => res.status(500).json(err));
  },
};
