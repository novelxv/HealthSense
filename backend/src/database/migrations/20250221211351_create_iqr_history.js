exports.up = function (knex) {
    return knex.schema.createTable("aqi_history", (table) => {
        table.increments("id").primary();
        table.string("city").notNullable();
        table.float("aqi").notNullable();
        table.float("pm25").nullable();
        table.float("pm10").nullable();
        table.float("no2").nullable();
        table.float("co").nullable();
        table.float("temperature").nullable();
        table.timestamp("recorded_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("aqi_history");
};  