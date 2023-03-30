
const jwt = require("jsonwebtoken");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

const verifyToken = (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization;
  
      if (authorizationHeader) {
        const token = authorizationHeader.split(" ")[1];
        jwt.verify(token, "theseissecretkey", (err, payload) => {
          if (err) {
            res.status(401).send({ success: false, msg: "Please provide a valid token" });
          } else {
            req.payload = payload;
            next();
          }
        });
      } else {
        res.status(401).send({ success: false, msg: "Please add token with header" });
      }
    } catch (err) {
      res.status(400).send({ success: false, err: err });
    }
  };
  module.exports = verifyToken;
