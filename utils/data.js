// for demo
// USER
// {
// 	"username": "tommyboy819",
// 	"email": "tommy@gmail.com"
// }

// THOUGHT
// {
//   "thoughtText": "Testing TESTING TESTING",
//   "username": "djbobs"
// }
//REACTION
// {
//   "reactionBody": "Testing REACTION TESTING TESTING",
//   "username": "sean123"
// }

const users = [
  {
    username: "djbobs",
    email: "bob@gmail.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "sean123",
    email: "sean@gmail.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "conner4321",
    email: "conner@gmail.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "jake321",
    email: "jake@gmail.com",
    thoughts: [],
    friends: [],
  },
];

const thoughts = [
  {
    thoughtText: "Testing TESTING TESTING",
    createdAt: Date.now(),
    username: "djbobs",
    reactions: [],
  },
  {
    thoughtText: "nldbcalsdjbclaksburkhbjadsfadsf",
    createdAt: Date.now(),
    username: "sean123",
    reactions: [],
  },
  {
    thoughtText: "qwertyqwertyqwertyqwertyqwerty",
    createdAt: Date.now(),
    username: "jake321",
    reactions: [],
  },
];

module.exports = { users, thoughts };
