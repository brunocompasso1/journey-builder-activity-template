"use strict";
var util = require("util");

console.log("#################### BRAND NEW RUN ####################");

// Deps
const Path = require("path");
const JWT = require(Path.join(__dirname, "..", "lib", "jwtDecoder.js"));
var util = require("util");
var http = require("https");
var request = require("request-promise");

exports.logExecuteData = [];

function logData(req) {
  exports.logExecuteData.push({
    body: req.body,
    headers: req.headers,
    trailers: req.trailers,
    method: req.method,
    url: req.url,
    params: req.params,
    query: req.query,
    route: req.route,
    cookies: req.cookies,
    ip: req.ip,
    path: req.path,
    host: req.host,
    fresh: req.fresh,
    stale: req.stale,
    protocol: req.protocol,
    secure: req.secure,
    originalUrl: req.originalUrl,
  });
  //   console.log("body: " + util.inspect(req.body));
  //   console.log("headers: " + req.headers);
  //   console.log("trailers: " + req.trailers);
  //   console.log("method: " + req.method);
  //   console.log("url: " + req.url);
  //   console.log("params: " + util.inspect(req.params));
  //   console.log("query: " + util.inspect(req.query));
  //   console.log("route: " + req.route);
  //   console.log("cookies: " + req.cookies);
  //   console.log("ip: " + req.ip);
  //   console.log("path: " + req.path);
  //   console.log("host: " + req.host);
  //   console.log("fresh: " + req.fresh);
  //   console.log("stale: " + req.stale);
  //   console.log("protocol: " + req.protocol);
  //   console.log("secure: " + req.secure);
  //   console.log("originalUrl: " + req.originalUrl);
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );
  //   logData(req);
  res.send(200, "Edit");
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );
  //   logData(req);
  res.send(200, "Save");
};

/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {
  // example on how to decode JWT
  JWT(req.body, process.env.jwtSecret, (err, decoded) => {
    // verification error -> unauthorized request
    if (err) {
      console.error(err);
      return res.status(401).end();
    }

    if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
      // decoded in arguments
      var decodedArgs = decoded.inArguments[0];
      console.log("inArguments", JSON.stringify(decoded.inArguments));
      console.log("decodedArgs", JSON.stringify(decodedArgs));

      console.log("##### Decoded args start #####");
      console.log(decoded.inArguments[0].phone);
      console.log("##### Decoded args end #####");

      //   SINCH TEST

    //   var messageData = {
    //     from: "447537454551",
    //     to: [decoded.inArguments[0].phone],
    //     body: "This is a test message from your Sinch account",
    //   };
    //   var options = {
    //     method: "POST",
    //     url:
    //       "https://us.sms.api.sinch.com/xms/v1/70daa9ae286148cd9875c470d19ff086/batches",
    //     headers: {
    //       accept: "application/json",
    //       "content-type": "application/json",
    //       Authorization: "Bearer 255788527a4d45cbb24e1c1fbd9b7afd",
    //     },
    //     body: JSON.stringify(messageData),
    //   };

    //   request(options, function (error, response, body) {
    //     console.log(response.body);
    //     if (error) throw new Error(error);
    //     console.log(body);
    //   });

      //   SINCH TEST

      // MC S2S GET TOKEN

      var options = {
        'method': 'POST',
        'url': 'https://mcky3r9wjc1f55-jtq-q05m-5441.auth.marketingcloudapis.com/v2/token',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "grant_type": "client_credentials",
          "client_id": "frm6git1ope9njqtj6fyir2o",
          "client_secret": "n87qbJtGCblUmw9fzW53HOZy"
        })
      
      };

      try {
        var result = await request(options)
        console.log(result)
        return result
    } catch (err) {
        console.error(err)
    }

      // MC S2S GET TOKEN

      //   logData(req);
      res.send(200, "Execute");
    } else {
      console.error("inArguments invalid.");
      return res.status(400).end();
    }
  });
};

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );
  //   logData(req);
  res.send(200, "Publish");
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
  // Data from the req and put it in an array accessible to the main app.
  //console.log( req.body );
  logData(req);
  res.send(200, "Validate");
};
