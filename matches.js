var express = require("express");
var router = express.Router();
var Match = require("../models/match");
var checkSessionAuth = require("../middlewares/checkSessionAuth");
/* GET home page. */
router.get("/", async function (req, res, next) {
  let matches = await Match.find();
  console.log(req.session.user);
  res.render("matches/list", { title: "Matches", matches });
});

router.get("/openlist", async function (req, res) {
  let matches = await Match.find();
  res.render("matches/openlist", { title: "Matches", matches });
});

router.get("/add", checkSessionAuth, async function (req, res, next) {
  res.render("matches/add");
});
// store data in db
router.post("/add", async function (req, res, next) {
  let match = new Match(req.body);
  await match.save();
  res.redirect("/api/final");
});
router.get("/delete/:id", async function (req, res, next) {
  let match = await Match.findByIdAndDelete(req.params.id);
  res.redirect("/api/final");
});
router.get("/cart/:id", async function (req, res, next) {
  let match = await Match.findById(req.params.id);
  console.log("Add This Match in cart");
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.push(match);
  res.cookie("cart", cart);
  res.redirect("/api/final");
});
router.get("/cart/remove/:id", async function (req, res, next) {
  let cart = [];
  if (req.cookies.cart) cart = req.cookies.cart;
  cart.splice(
    cart.findIndex((c) => c._id == req.params.id),
    1
  );
  res.cookie("cart", cart);
  res.redirect("/cart");
});
router.get("/edit/:id", async function (req, res, next) {
  let match = await Match.findById(req.params.id);
  res.render("matches/edit", { product });
});
router.post("/edit/:id", async function (req, res, next) {
  let match = await Match.findById(req.params.id);
  match.name = req.body.name;
  match.description = req.body.description;
  match.price = req.body.price;
  match.rating = req.body.rating;
  await match.save();
  res.redirect("/api/final");
});

module.exports = router;
