"use strict"

const jwt = require("jsonwebtoken")
const redis = require("node-redis").createClient()

function generateToken (sms_code, username) {
}

function verifyToken () {
}

function inspectPermissions () {
}

module.exports = function (app) {
    const Seneca = require("seneca")
    function authentication () {
        this.add("service:user,name:authentication", (msg, done) => {
            const result = generateToken(msg.sms_code, msg.username)
            return done(null, { answer: result})
        })
    }

    function authorized () {
        this.add("service:user,name:authorized", (msg, done) => {
            const result = verifyToken(msg.token)
            return done(null, { answer: result })
        })
    }

    function profiles () {
        this.add("service:user,name:authorized,cmd:profiles", (msg, respond) => {
            this.prior(msg, (err, reply) => {
                if (!answer.result)
                    return respond(null, { answer: "permission denied", permissions: [] })
                const permissions = inspectPermissions(answer.result, msg.token)
                return respond(null, { answer, permissions })
            })
        })
    }
}
