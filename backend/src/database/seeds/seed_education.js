exports.seed = function (knex) {
    return knex("education")
    .del()
    .then(() => {
        return knex("education").insert([
            {
                title: "Dampak Polusi Udara terhadap Kesehatan",
                content:
                "Polusi udara, khususnya PM2.5 dan PM10, dapat menyebabkan berbagai masalah pernapasan seperti asma dan ISPA.",
                category: "Polusi Udara",
                location: "Jakarta",
            },
            {
                title: "Cara Mengurangi Risiko Terkena ISPA",
                content:
                "Hindari keluar rumah saat kualitas udara buruk, gunakan masker, dan perbanyak konsumsi makanan kaya antioksidan.",
                category: "Kesehatan",
                location: null,
            },
            {
                title: "Pentingnya Menggunakan Masker di Kota Besar",
                content:
                "Kota-kota besar sering memiliki tingkat polusi yang tinggi. Menggunakan masker dapat membantu melindungi saluran pernapasan.",
                category: "Kesehatan",
                location: "Surabaya",
            },
        ]);
    });
};  