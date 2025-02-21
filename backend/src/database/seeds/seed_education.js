exports.seed = function (knex) {
    return knex("education")
        .del()
        .then(() => {
            return knex("education").insert([
                {
                    title: "Dampak Polusi Udara terhadap Kesehatan",
                    content: "Polusi udara, khususnya PM2.5 dan PM10, dapat menyebabkan berbagai masalah pernapasan seperti asma dan ISPA. Partikel halus ini bisa masuk ke dalam paru-paru dan aliran darah, meningkatkan risiko penyakit kardiovaskular serta gangguan pernapasan kronis.",
                    category: "Polusi Udara",
                    location: "Jakarta",
                    image: "../../AirTerjun.png"
                },
                {
                    title: "Cara Mengurangi Risiko Terkena ISPA",
                    content: "ISPA merupakan infeksi yang menyerang saluran pernapasan akibat paparan polusi udara atau virus. Beberapa cara untuk mengurangi risiko terkena ISPA adalah dengan menghindari tempat berpolusi tinggi, menggunakan masker, serta menjaga pola makan sehat dengan konsumsi makanan yang kaya antioksidan.",
                    category: "Kesehatan",
                    location: "Bandung",
                    image: "../../AirTerjun2.png"
                },
                {
                    title: "Pentingnya Menggunakan Masker di Kota Besar",
                    content: "Menggunakan masker saat berada di kota besar dapat melindungi paru-paru dari paparan polusi udara yang tinggi. Masker jenis N95 lebih efektif dalam menyaring partikel halus dibandingkan masker kain biasa.",
                    category: "Kesehatan",
                    location: "Surabaya",
                    image: "../../AirTerjun3.jpg"
                },
                {
                    title: "Bagaimana Polusi Udara Mempengaruhi Kualitas Hidup?",
                    content: "Polusi udara tidak hanya berdampak pada kesehatan fisik tetapi juga dapat memengaruhi kesehatan mental. Paparan udara kotor dalam jangka panjang dapat menyebabkan stres, gangguan tidur, serta penurunan produktivitas kerja.",
                    category: "Polusi Udara",
                    location: "Jakarta",
                    image: "../../AirTerjun4.jpg"
                },
                {
                    title: "Kota dengan Kualitas Udara Terburuk di Dunia",
                    content: "Beberapa kota di dunia memiliki tingkat polusi udara yang sangat tinggi. Kota-kota seperti New Delhi, Beijing, dan Jakarta sering masuk dalam daftar kota dengan polusi udara terburuk akibat kombinasi asap kendaraan, industri, dan pembakaran bahan bakar fosil.",
                    category: "Lingkungan",
                    location: "Internasional",
                    image: "../../AirTerjun5.jpg"
                },
                {
                    title: "Manfaat Menanam Pohon dalam Mengurangi Polusi",
                    content: "Pohon berperan sebagai penyaring alami yang dapat menyerap karbon dioksida dan partikel polusi udara. Program penghijauan di perkotaan sangat penting untuk meningkatkan kualitas udara dan mengurangi efek rumah kaca.",
                    category: "Lingkungan",
                    location: "Jakarta",
                    image: "../../AirTerjun6.jpg"
                },
                {
                    title: "Dampak Pemanasan Global terhadap Kesehatan",
                    content: "Pemanasan global menyebabkan peningkatan suhu rata-rata dunia, yang dapat memicu gelombang panas ekstrem. Hal ini berisiko menyebabkan dehidrasi, serangan jantung, dan meningkatnya penyebaran penyakit tropis.",
                    category: "Perubahan Iklim",
                    location: "Indonesia",
                    image: "../../AirTerjun7.jpg"
                },
                {
                    title: "Tips Menjaga Kesehatan Saat Polusi Udara Tinggi",
                    content: "Saat indeks kualitas udara memburuk, disarankan untuk tetap berada di dalam ruangan, menggunakan pembersih udara, dan menghindari aktivitas fisik berat di luar rumah.",
                    category: "Kesehatan",
                    location: "Bandung",
                    image: "../../AirTerjun8.jpg"
                },
                {
                    title: "Apa Itu Indeks Kualitas Udara (AQI) dan Bagaimana Cara Membacanya?",
                    content: "Indeks Kualitas Udara (AQI) digunakan untuk mengukur tingkat polusi udara. Skala AQI berkisar dari 0 hingga 500, dengan kategori warna yang menunjukkan tingkat bahaya bagi kesehatan manusia.",
                    category: "Polusi Udara",
                    location: "Jakarta",
                    image: "../../AirTerjun9.jpg"
                },
                {
                    title: "Peran Teknologi dalam Mengatasi Polusi Udara",
                    content: "Teknologi seperti filter udara HEPA, kendaraan listrik, dan sistem pemantauan kualitas udara berbasis AI dapat membantu mengurangi dampak polusi udara di perkotaan.",
                    category: "Teknologi",
                    location: "Surabaya",
                    image: "../../AirTerjun10.jpg"
                }
            ]);
        });
};