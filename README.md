## Tech Stack

+ For this service, I would recommend using the following tech stack:
1. Node.js - This is a JavaScript runtime that allows for fast and efficient server-side development. It also has a vast ecosystem of libraries and frameworks that can be used for building the service.

2. Express.js - This is a popular web framework for Node.js that provides a simple and intuitive way to build HTTP APIs.

3. MongoDB - This is a NoSQL database that is well-suited for storing large amounts of data and handling high traffic loads. It is also flexible and easy to scale, making it a good choice for this service.

4. Mongoose - This is an Object Document Mapper (ODM) for MongoDB that makes it easy to map database objects to JavaScript objects and vice versa. It also provides a simple and intuitive API for interacting with the database.

5. Jest - This is a testing framework that is well-suited for testing Node.js applications. It is easy to use, has a large number of features, and is well-supported by the community.

6. OpenAPI 3.0 - This is a specification for building APIs that allows for easy documentation and testing of API endpoints. It can be used to define the API endpoints and request/response schemas for this service.

# HTTP APIs

+ List top users by internet usage

Endpoint: /api/users/top

Method: GET

Parameters:

  time_period (optional, one of "1d", "7d", "30d"): The time period for which to retrieve the top users. Defaults to "1d".
  page (optional, integer): The page number for the results. Defaults to 1.
  limit (optional, integer): The number of results per page. Defaults to 10.
  
  + Response:
  
  200: Success. Returns a list of users sorted by internet usage in descending order. Each user has the following fields:
  id (string): The unique identifier for the user.
  name (string): The name of the user.
  usage (integer): The total internet usage for the specified time period (in bytes).
  created_at (string): The date and time when the user was created (in ISO 8601 format).
  
+ Search users by name

Endpoint: /api/users/search

Method: GET

Parameters:

  name (required, string): The name of the user to search for.

Response:

  200: Success. Returns a list of users matching the specified name. Each user has the following fields:
  id (string): The unique identifier for the user.
  name (string): The name of the user.
  usage (integer): The total internet usage for the specified time period (in bytes).
  created_at (string): The date and time when the user was created (in ISO 8601 format).
  
+ Database Model

  The database model for this service will consist of a single collection called "users", which will store the following fields for each user:
  id (string): The unique identifier for the user.
  name (string): The name of the user.
  usage (integer): The total internet usage for the specified time period (in bytes).
  created_at (string): The date and time when the user was created (in ISO 8601 format).
  This model will allow for fast and efficient retrieval of user data, as well as easy query. 




