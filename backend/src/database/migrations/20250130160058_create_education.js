exports.up = function (knex) {
    return knex.schema.createTable("education", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.text("content").notNullable();
        table.string("category").notNullable(); // Misal: Polusi Udara, Penyakit, Lingkungan
        table.string("location").nullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("education");
};  