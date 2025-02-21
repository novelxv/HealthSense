exports.up = function (knex) {
    return knex.schema.alterTable("education", (table) => {
        table.string("image").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.alterTable("education", (table) => {
        table.dropColumn("image");
    });
};