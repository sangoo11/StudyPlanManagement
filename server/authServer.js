const jwt = require('jsonwebtoken')
const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.AUTH_PORT || 4001

function authUser(req, res, next) {
    if (req.user == null) {
        return res.status(403).send('You need to sign in')
    }
    next()
}

function authRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(401).send('Not allowed')
        }
        next()
    }
}

function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send('You need to sign in')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Token not verify')
        req.user = user
    })
}

app.listen(PORT, (req, res) => {
    console.log(`Auth server is running on port ${PORT}`)
})

module.exports = { authUser, authRole, authToken }