const express = require("express");
const path = require("path");
const axios = require("axios");
const keys = require("./config/keys");

const app = express();
const port = process.env.PORT || 9000;

//static server
app.use(express.static(path.join(__dirname, "./public")));

app.get(`/user/:user`, (req, res) => {
  let user = req.params.user;
  console.log(req.params.user);

  axios
    .get(
      `https://api.github.com/users/${user}?client_id=${
        keys.clientid
      }&client_secret=${keys.clientsecret}`
    )
    .then(response => {
      res.send({
        profile: response.data
      });
    })
    .catch(e => {
      res.send(e.response.data);
    });
});

app.get("/repos/:user", (req, res) => {
  let user = req.params.user;
  axios
    .get(
      `https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${
        keys.clientid
      }&client_secret=${keys.clientsecret}`
    )
    .then(response => {
      res.send({ repos: response.data });
    })
    .catch(e => {
      res.send(e.response.data);
    });
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
