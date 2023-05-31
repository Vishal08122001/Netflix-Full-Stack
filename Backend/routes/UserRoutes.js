const {
  addToLikedmovies,
  getLikedMovies,
  removeList,
} = require("../controllers/UserController");


const router = require("express").Router();

router.post("/add", addToLikedmovies);
router.get("/liked/:email", getLikedMovies);
router.delete('/liked/:email/delete/:id', removeList);
module.exports = router;

