'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const dotenv = require('dotenv').config()

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ACCESS_TOKEN: JSON.stringify(process.env.ACCESS_TOKEN)
})
