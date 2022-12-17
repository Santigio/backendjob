## Tech Stack

+ For this service, I would recommend using the following tech stack:
1. Node.js - This is a JavaScript runtime that allows for fast and efficient server-side development. It also has a vast ecosystem of libraries and frameworks that can be used for building the service.

2. Express.js - This is a popular web framework for Node.js that provides a simple and intuitive way to build HTTP APIs.

3. MongoDB - This is a NoSQL database that is well-suited for storing large amounts of data and handling high traffic loads. It is also flexible and easy to scale, making it a good choice for this service.

4. Mongoose - This is an Object Document Mapper (ODM) for MongoDB that makes it easy to map database objects to JavaScript objects and vice versa. It also provides a simple and intuitive API for interacting with the database.

5. Jest - This is a testing framework that is well-suited for testing Node.js applications. It is easy to use, has a large number of features, and is well-supported by the community.

6. OpenAPI 3.0 - This is a specification for building APIs that allows for easy documentation and testing of API endpoints. It can be used to define the API endpoints and request/response schemas for this service.

## HTTP APIs

+ List top users by internet usage

      Endpoint: /api/users/top

Method: GET

Parameters:

    time_period (optional, one of "1d", "7d", "30d"): The time period for which to retrieve the top users. Defaults to "1d".
    page (optional, integer): The page number for the results. Defaults to 1.
    limit (optional, integer): The number of results per page. Defaults to 10.

Response:
  
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

## Database Model

    The database model for this service will consist of a single collection called "users", which will store the following fields for each user:
    id (string): The unique identifier for the user.
    name (string): The name of the user.
    usage (integer): The total internet usage for the specified time period (in bytes).
    created_at (string): The date and time when the user was created (in ISO 8601 format).
    This model will allow for fast and efficient retrieval of user data, as well as easy query. 



+++ To ingest the provided dataset into the service's database, we can create a script that reads the data from the file and inserts it into the "users" collection in the database.

> Here is an example of how this script might work:

1. Connect to the database using Mongoose.
2. Read the data from the file and parse it into a JavaScript object.
3. Iterate through the object and create a new "User" model for each record.
4. Save the model to the database.


Here is a code to demonstrates how this script might work:

    const mongoose = require('mongoose');
    const User = require('./models/user');

    // Connect to the database
    mongoose.connect('mongodb://localhost:27017/internet_usage', { useNewUrlParser: true, useUnifiedTopology: true });

    // Read the data from the file and parse it into a JavaScript object
    const data = require('./data.json');

    // Iterate through the data and create a new User model for each record
    data.forEach(record => {
      const user = new User({
        id: record.id,
        name: record.name,
        usage: record.usage,
        created_at: record.created_at
      });

      // Save the model to the database
      user.save();
    });

    // Close the database connection
    mongoose.connection.close();


This script can be run from the command line using the following command:
      
      node ingestion_script.js



> To implement the paginated HTTP API to list top users by their internet usage, we can create an endpoint that accepts the following parameters:

  time_period (optional, one of "1d", "7d", "30d"): The time period for which to retrieve the top users. Defaults to "1d".
  page (optional, integer): The page number for the results. Defaults to 1.
  limit (optional, integer): The number of results per page. Defaults to 10.
  The endpoint should return a list of users sorted by internet usage in descending order, with the specified number of results per page.

Here is an example of how this endpoint might work:

    const express = require('express');
    const router = express.Router();
    const User = require('../models/user');

    // List top users by internet usage
    router.get('/top', async (req, res) => {
      try {
        // Parse the query parameters
        const timePeriod = req.query.time_period || '1d';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Set the date range based on the time period
        let startDate, endDate;
        if (timePeriod === '1d') {
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 1);
          endDate = new Date();
        } else if (timePeriod === '7d') {
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 7);
          endDate = new Date();
        } else if (timePeriod === '30d') {
          startDate = new Date();
          startDate.setDate(startDate.getDate() - 30);
          endDate = new Date();
        }

        // Retrieve the top users from the database
        const users = await User.find({
          created_at: {
            $gte: startDate,
            $lte: endDate
          }
        })
          .sort({ usage: -1 })
          .skip((page - 1) * limit)
          .limit(limit);

        // Send the results back to the client
        res.send(users);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    module.exports = router;


This endpoint can be accessed by sending a GET request to the following URL:

    /api/users/top?time_period=7d&page=2&limit=20

    This will return the top 20 users for the past 7 days, starting from page 2.


> To implement the user details HTTP API to search users by their exact name, we can create an endpoint that accepts a name parameter and returns the matching user's internet usage consumption.

Here is an example of how this endpoint might work:

    const express = require('express');
    const router = express.Router();
    const User = require('../models/user');

    // Search users by name
    router.get('/search', async (req, res) => {
      try {
        // Retrieve the user from the database
        const user = await User.findOne({ name: req.query.name });

        // Send the results back to the client
        res.send(user);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    module.exports = router;

