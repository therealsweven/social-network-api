const { Thought, User } = require("../models");

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
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { username: req.body.username },
        {
          $push: {
            thoughts: thought._id,
          },
        }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body)
      .select("-__v")
      .lean()
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
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      console.log(thought);
      await User.findOneAndUpdate(
        { username: thought.username },
        {
          $pull: { thoughts: { _id: req.params.thoughtId } },
        }
      );
      !thought
        ? res.status(404).json({ message: "No such thought exists" })
        : res.status(200).json({ message: "Thought deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Create a new Reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $push: {
            reactions: req.body,
          },
        }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a Reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: { reactions: { reactionId: req.body.reactionId } },
      }
    )
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
};
