const knex = require("../database/knex");

const subscribeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ message: "Email tidak valid!" });
  }

  try {
    // Cek apakah email sudah terdaftar
    const existing = await knex("subscribers").where({ email }).first();
    if (existing) {
      return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    await knex("subscribers").insert({ email });
    res.json({ message: "Berhasil berlangganan!" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};

module.exports = { subscribeEmail };