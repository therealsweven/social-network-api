const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { users, thoughts } = require("./data");
console.log(users);
console.log(thoughts);
connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Add users to the collection and await results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
