"use strict"

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "dev.sqlite3",
    charset  : "utf8"
  }
})

const bookshelf = require("bookshelf")(knex)

module.exports = function () {
    const models = {}
    models["user"] = bookshelf.Model.extend({
        tableName: "users",
        identify () {
            return this.hasOne(models["organization_roles"])
        }
    })

    models["organization_roles"] = bookshelf.Model.extend({
        tableName: "organizations_roles",
        role () {
            return this.belongsTo(models["role"])
        },
        organization () {
            return this.belongsTo(models["organization"])
        },
        allPermissions () {
            return this.belongsToMany(models["permission"])
        },
        app1Permissions () {
            return this.belongsToMany(models["permission"]).query({ where: { app_id: "1" }})
        }
    })

    models["organization"] = bookshelf.Model.extend({
        tableName: "organizations",
        roles () {
            return this.hasMany(models["role"]).through(models["organization_roles"])
        }
    })

    models["role"] = bookshelf.Model.extend({
        tableName: "roles",
        organizations () {
            return this.hasMany(models["organization"]).through(models["organization_roles"])
        }
    })

    models["permission"] = bookshelf.Model.extend({
        tableName: "permissions"
    })

    return models
}
