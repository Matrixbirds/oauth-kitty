"use strict"

exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTableIfNotExists("users", function (table) {
            table.increments("id")
            table.string("name")
            table.string("phonenumber")
            table.string("identify_id")
            table.timestamps()
        }),
        knex.schema.createTableIfNotExists("roles", function (table) {
            table.increments("id")
            table.string("name")
            table.integer("user_id")
            table.timestamps()
        }),
        knex.schema.createTableIfNotExists("permissions", function (table) {
            table.increments("id")
            table.string("method")
            table.string("path")
            table.timestamps()
        }),
        knex.schema.createTableIfNotExists("organizations", function (table) {
            table.increments("id")
            table.string("name")
            table.string("level")
            table.timestamps()
        }),
        knex.schema.createTableIfNotExists("organizations_roles",
            function (table) {
                table.increments("id")
                table.string("resources_type")
                table.integer("resources_id")
                table.timestamps()
            }
        )
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable("users"),
        knex.schema.dropTable("roles"),
        knex.schema.dropTable("permissions"),
        knex.schema.dropTable("organizations"),
        knex.schema.dropTable("organization_roles")
    ])
};
