exports.seed = function (knex) {
    return knex("health_data")
    .del()
    .then(() => {
        return knex("health_data").insert([
            {
                location: "Jakarta",
                pm25: 78.5,
                pm10: 120.4,
                no2: 35.2,
                co: 0.8,
                temperature: 32.1,
                humidity: 70.5,
            },
            {
                location: "Bandung",
                pm25: 45.2,
                pm10: 90.1,
                no2: 20.8,
                co: 0.5,
                temperature: 28.3,
                humidity: 75.2,
            },
        ]);
    });
};  