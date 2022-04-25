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
Node.js v14 or higher is required.
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

## Usage

### Create user
**You send:**  Your email and password.

**You get:** A `success` message with the status.

**Request:**
```json
POST /api/users/createUser HTTP/1.1
Content-Type: application/json

{
    "username": "test@mail.com",
    "password": "123456" 
}

```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "success": true,
}
```
**Failed Response:**
```json
HTTP/1.1 400 Bad request
Content-Type: application/json

{
    "error": "username and password are required"
}
``` 

### Login
**You send:**  Your  login credentials (email and password).

**You get:** An `Token` with wich you can make further actions.

**Request:**
```json
POST /api/users/login HTTP/1.1
Content-Type: application/json

{
    "username": "test@mail.com",
    "password": "123456" 
}

```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
   "token": "eyJ1c2VySWQiOiI2MjY1Zjc1ZjdjYzY2OGQyMjA5NDgxZWQiLCJlbWFpbCI6ImhlbnJ5MkBnbWFpbC5jb20iLCJpYXQiOjE2NTA4NDk4ODUsImV4cCI6MTY1MDg1NzA4NX0.uwU4kjpncZz88Op1x-XxMvAuwRLT9kQ_w1SONOyIIhc",
}
```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "code": 401,
    "error": "Invalid Credentials"
}
``` 

### Create item
**You send:**  Your data for your new item (title, description, link).

**You get:** The data you sent, current ID, creation date.

**Request:**
```json
POST /api/items/createItem HTTP/1.1
Content-Type: application/json

{
    "title": "Polera negra",
    "description": "Polera edición otoño 2022",
    "link": "htts://www.fakestore.com/65132432165432",
}

```
**Successful Response:**
```json
HTTP/1.1 201 OK
Content-Type: application/json

{
    "_id": "625b8dc29e97dc73e205a45c",
    "title": "Polera negra",
    "description": "Polera edición otoño 2022",
    "link": "htts://www.fakestore.com/65132432165432",
    "createdAt": "2022-04-17T03:47:14.416Z",
    "updatedAt": "2022-04-17T03:47:14.416Z",
    "__v": 0
}
```
**Failed Response:**
```json
HTTP/1.1 400 Bad request
Content-Type: application/json

{
    "error": "title is required"
}
```

### Get all list of favorites

**You get:** All list of favorites from your current user.

**Request:**
```json
GET /api/favs/ HTTP/1.1
Content-Type: application/json
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
        "_id": "625b99bcc7d57d0cf366ee53",
        "name": "Fav list 1",
        "owner": "625b87d9b9741a7efdca2e70",
        "favItems": [
            {
                "_id": "625b8dc29e97dc73e205a45c",
                "title": "Polera negra",
                "description": "Polera marca La Coste exclusiva edición otoño 2022",
                "link": "htts://www.fakestore.com/65132432165432",
                "createdAt": "2022-04-17T03:47:14.416Z",
                "updatedAt": "2022-04-17T03:47:14.416Z",
                "__v": 0
            }
        ],
        "createdAt": "2022-04-17T04:38:20.964Z",
        "updatedAt": "2022-04-17T04:38:20.964Z",
        "__v": 0
    }
]
```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid Credentials"
}
```

### Creates a new list of favorites

**You send:**  Your data for your new favorite list (name, list of fav items ID).

**You get:** The data you sent, current ID, owner ID, creation date.

**Request:**
```json
POST /api/favs/ HTTP/1.1
Content-Type: application/json

{
    "name":"My first fav list",
    "favItems": 
        [
            "625b8dc29e97dc73e205a45c"
        ]
}
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
        "_id": "625b99bcc7d57d0cf366ee53",
        "name": "My first fav list",
        "owner": "625b87d9b9741a7efdca2e70",
        "favItems": [
            {
                "_id": "625b8dc29e97dc73e205a45c",
                "title": "Polera negra",
                "description": "Polera marca La Coste exclusiva edición otoño 2022",
                "link": "htts://www.fakestore.com/65132432165432",
                "createdAt": "2022-04-17T03:47:14.416Z",
                "updatedAt": "2022-04-17T03:47:14.416Z",
                "__v": 0
            }
        ],
        "createdAt": "2022-04-17T04:38:20.964Z",
        "updatedAt": "2022-04-17T04:38:20.964Z",
        "__v": 0
    }
]
```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid Credentials"
}
```

### Get a single list of favorites

**You get:** A single list of favorites from your current user.

**Request:**
```json
GET /api/favs/:id HTTP/1.1
Content-Type: application/json
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "_id": "625b99bcc7d57d0cf366ee53",
    "name": "Fav list 1",
    "owner": "625b87d9b9741a7efdca2e70",
    "favItems": [
        {
            "_id": "625b8dc29e97dc73e205a45c",
            "title": "Polera negra",
            "description": "Polera marca La Coste exclusiva edición otoño 2022",
            "link": "htts://www.fakestore.com/65132432165432",
            "createdAt": "2022-04-17T03:47:14.416Z",
            "updatedAt": "2022-04-17T03:47:14.416Z",
            "__v": 0
        }
    ],
    "createdAt": "2022-04-17T04:38:20.964Z",
    "updatedAt": "2022-04-17T04:38:20.964Z",
    "__v": 0
}
```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid Credentials"
}
```

### Delete a single list of favorites

**You send:**  The ID of the list of favorites that you want to delete.

**You get:** An status of the request.

**Request:**
```json
DELETE /api/favs/:id HTTP/1.1
Content-Type: application/json
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "success": true,
}
```
**Failed Response:**
```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    "error": "Invalid Credentials"
}
```