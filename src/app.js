const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Node.js Weather",
    name: "Angel Rodriguez",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Angel Rodriguez",
    about_me: "Junior Software Developer/Tech Enthusiast/Christ Follower",
    description:
      "This app was designed to practice creating routes in Node.js and for the user (you) to check your forecast. I also used it to become more familiar with handlebars.",
  });
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio", {
    title: "Portfolio",
    link: `www.angelroddie.com`,
    name: "Angel Rodriguez",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "No help information is avaiable just yet.",
    title: "Help",
    name: "Angel Rodriguez",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData, alerts, icon) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          forecast: forecastData,
          alerts,
          icon,
          address: req.query.address,
        });
        console.log("Server side JavaScript file is loaded!");
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Angel Rodriguez",
    help: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Angel Rodriguez",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
