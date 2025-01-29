exports.up = function (knex) {
    return knex.schema.createTable("health_data", (table) => {
        table.increments("id").primary();
        table.string("location").notNullable();
        table.float("pm25").notNullable(); // Kualitas udara PM2.5
        table.float("pm10").notNullable(); // Kualitas udara PM10
        table.float("no2").notNullable();  // Konsentrasi NO2
        table.float("co").notNullable();   // Konsentrasi CO
        table.float("temperature").notNullable(); // Suhu
        table.float("humidity").notNullable(); // Kelembapan
        table.timestamp("recorded_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("health_data");
};  