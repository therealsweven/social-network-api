# Social Network API

![GitHub License](https://img.shields.io/badge/License-MIT-blue)

## Description

This is a back-end API to be used for a basic social network. The API consists of users, thoughts, and reactions as documents of thoughts. The user may add and remove friends, create and delete thoughts, and add and remove reactions to thoughts.

Walkthrough video: https://drive.google.com/drive/folders/1dB8lRJZZIFaRWb9waOsWbr7f-Gosy3Fl?usp=sharing

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [License](#license)

- [Contributing](#contributing)

- [Questions](#Questions)

## Installation

N/A

## Usage

The application may be access by running 'npm run start' in the CLI. This will kickoff the server. The following routes may be used for their corresponding purposes using the given request body keys:
<br><br>
/api/users --> req.body = {"username": STRING,"email": STRING} <br>
GET (Get all users) <br>
POST (Add new user) <br>
<br>
/api/users/:id --> req.body = {"username": STRING,"email": STRING} <br>
GET (Get user by ID) <br>
PUT (Update user by ID) <br>
DELETE (Delete user by ID) <br>
<br>
/api/users/:userId/friends/:friendId <br>
POST (Add friend)<br>
DELETE (Remove friend)<br>
<br>
/api/thoughts --> req.body = {"username": STRING,"thoughtText": STRING} <br>
GET (Get all Users)<br>
POST (Create new user)<br>
<br>
/api/thoughts/:thoughtId --> req.body = {"username": STRING,"thoughtText": STRING} <br>
GET (Get single thought)<br>
PUT (Update thought by id)<br>
DELETE (Delete thought by id)<br>
<br>
/api/thoughts/:thoughtId/reactions --> req.body = {"reactionID"=STRING,"username": STRING,"reactionBody": STRING} <br>
POST (Create new reaction) <br>
DELETE (Delete a reaction(reactionID required in body to delete)) <br>

## License

MIT

## Contributing

N/A

## Questions

My Github profile is https://github.com/therealsweven/.
Please reach out to borntobebobby@gmail.com with any additional questions.
