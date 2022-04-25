[![Express Logo](https://i.cloudup.com/zfY6lL7eFa-3000x3000.png)](http://expressjs.com/)

# Favs-API

Favs is a new company that aims to provide a better way to organize your favorite things: music, clothes, courses, etc., all in one place.

## Requirements

* Each user will have a unique id, and he will authenticate using a non-empty email and a password.
* Each user will be able to save a list of favs. Each fav will have an title , description and link, and each list will be defined by a unique id and a name.
* The system have to allow the following actions
* Create a new list with a given name (auto-generate the unique id)
* Get the users lists
* Get an individual list for the user
* Add items to a given list (based on the generated id)
* All endpoints have to be secured with Bearer Auth (JWT) Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkNBTUlMTyB6dWx1YWdhIiwicm9sZSI6InZpZXdlciIsImVtYWlsIjoiaysxQGxvLmNvbSIsImlhdCI6MTY0ODg0Mzc2NCwiZXhwIjoxNjQ4ODUwOTY0fQ.SG40QSQ7IZgvDT98Vr7KMYb2Oxfpy_mfeSHRv3fXZcY
* You should ensure that the password is strong enough

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.
Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install
```

## Authorization

To authenticate an API request, you should provide your API key in the `Authorization` header.

## Status Codes

Favs-API returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
