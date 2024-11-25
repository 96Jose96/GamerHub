const express = require('express')
const registryRouter = express.Router()
const RegistryController = require('../controllers/registry.controller.js')

registryRouter.post('/registry', RegistryController.registryUser)

module.exports = registryRouter