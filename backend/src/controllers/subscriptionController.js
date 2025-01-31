const knex = require("../database/knex");

const subscribeEmail = async (req, res) => {
  const { email } = req.body;
  try {
    await knex("subscribers").insert({ email });
    res.json({ message: "Subscribed successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing email", error });
  }
};

module.exports = { subscribeEmail };