exports.up = function (knex) {
    return knex.schema.alterTable("health_data", (table) => {
        table.decimal("latitude", 10, 7).nullable();
        table.decimal("longitude", 10, 7).nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("health_data", (table) => {
        table.dropColumn("latitude");
        table.dropColumn("longitude");
    });
};