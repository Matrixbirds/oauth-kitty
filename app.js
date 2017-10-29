"use strict"

const Koa = require("koa")

const app = new Koa()

const bodyparser = require("koa-bodyparser")
const router = require("koa-router")()
const logger = require("koa-logger")

router.get("/", async function(ctx, next) {
    ctx.status = 200
})

router.post("/login", async function(ctx, next) {
    ctx.status = 200
})

app.use(logger())
app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())

if (require.main === module) {
    let instance = app.listen(3000, function () {
        console.log(`Listening on ${instance.address().port}`)
    })
}

module.exports = app
