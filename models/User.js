const { Schema, Types } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual `friendCount` to get number of friends
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize the model
const User = model("user", userSchema);

module.exports = User;
