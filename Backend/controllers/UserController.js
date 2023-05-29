const User = require("../models/UserModels");

module.exports.addToLikedmovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id); // Fixed the comparison here
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            $push: { likedMovies: data }, // Modified the update to use $push to add the movie to the array
          },
          {
            new: true,
          }
        );
      } else {
        return res.json({ msg: "Movie Already added to the liked list" });
      }
    } else {
      await User.create({
        email,
        likedMovies: [data],
      });
    }
    return res.json({ msg: "Movie added successfully" });
  } catch (error) {
    return res.json({
      msg: "Error Adding Movie +" + error,
    });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (user) {
      res.json({ msg: "success", movies: user.likedMovies });
    } else {
      res.json({ msg: "User with given email is not found" });
    }
  } catch (error) {
    return res.json({ msg: "Error fetching movies: " + error });
  }
};
