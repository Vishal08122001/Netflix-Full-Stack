const {
  addToLikedmovies,
  getLikedMovies,
} = require("../controllers/UserController");
const router = require("express").Router();

router.post("/add", addToLikedmovies);
router.get("/liked/:email", getLikedMovies);
module.exports = router;
