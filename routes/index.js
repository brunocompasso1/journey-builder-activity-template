"use strict";

// Deps
var activity = require("./activity");

// SINCH TEST

// var request = require("request");
// var messageData = {
//   from: "447537454551",
//   to: ["5519971159735"],
//   body: "This is a test message from your Sinch account",
// };
// var options = {
//   method: "POST",
//   url:
//     "https://us.sms.api.sinch.com/xms/v1/70daa9ae286148cd9875c470d19ff086/batches",
//   headers: {
//     accept: "application/json",
//     "content-type": "application/json",
//     Authorization: "Bearer 255788527a4d45cbb24e1c1fbd9b7afd",
//   },
//   body: JSON.stringify(messageData),
// };

// request(options, function (error, response, body) {
//   console.log(response.body);
//   if (error) throw new Error(error);
//   console.log(body);
// });

// SINCH TEST

/*
 * GET home page.
 */
exports.index = function (req, res) {
  if (!req.session.token) {
    res.render("index", {
      title: "Unauthenticated",
      errorMessage:
        "This app may only be loaded via Salesforce Marketing Cloud",
    });
  } else {
    res.render("index", {
      title: "Journey Builder Activity",
      results: activity.logExecuteData,
    });
  }
};

exports.login = function (req, res) {
  console.log("req.body: ", req.body);
  res.redirect("/");
};

exports.logout = function (req, res) {
  req.session.token = "";
};
