const knex = require("../database/knex");
const sendEmail = require("../services/emailService");

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

    // Kirim email konfirmasi
    const subject = "Berlangganan HealthSense";
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #007bff;">Selamat Bergabung di HealthSense!</h2>
        <p>Terima kasih telah berlangganan notifikasi kualitas udara dari HealthSense.</p>
        <p>Jaga kesehatanmu dengan informasi real-time mengenai kualitas udara di sekitarmu.</p>
        <br/>
        <p>Salam sehat,</p>
        <p><b>Tim HealthSense</b></p>
      </div>
    `;
    await sendEmail(email, subject, htmlContent);

    res.json({ message: "Berhasil berlangganan!" });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};

module.exports = { subscribeEmail };