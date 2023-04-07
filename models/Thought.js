const { Schema, Types, model } = require("mongoose");

// subdocument schema for reactions
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => {
        if (date)
          return (
            date.toISOString().split("T")[0] +
            " at " +
            date.toISOString().split("T")[1].split(".")[0]
          );
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// parent schema for thoughts
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => {
        if (date)
          return (
            date.toISOString().split("T")[0] +
            " at " +
            date.toISOString().split("T")[1].split(".")[0]
          );
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual `reactionCount` to get number of friends
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize the model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
