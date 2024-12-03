const bcrypt = require('bcrypt')
const admin = require('../config/fireBaseAdmin.js')
const User = require('../models/user.model.js')



const RegistryController = {
    
    async registryUser (req, res) {
        const { idToken, username, email, password, profileimage } = req.body
        try {
            if (!idToken || !username || !email || !password) {
               return res.status(400).json({ message: 'Todos los campos deben estar rellenos' })
            }

            let decodedToken

        try {
            decodedToken = await admin.auth().verifyIdToken(idToken) 
        } catch (error) {
            return res.status(403).json({ message: 'Invalid Firebase token', error })
        }

            const { uid } = decodedToken
    
            const existUser = await User.findOne({ $or: [{ uid }, { email }] })

            if (existUser) {
                 return res.status(409).json({
                    message: existUser.email === email ? 'Este email ya está registrado' : 'Este nombre de usuario ya está en uso'
                 })
            }
    
            const hashedPassword = await bcrypt.hash(password, 10)
    
            const newUser = new User({
                uid,
                username,
                email,
                password: hashedPassword,
                profileimage: profileimage ||'',
                friends: []
            })
    
            await newUser.save()
    
            return res.status(201).json({
                message: 'Usuario registrado con éxito',
                user: {
                    uid: newUser.uid,
                    username: newUser.username,
                    email: newUser.email,
                    // profileimage: newUser.profileimage
                }
            })
            
        } catch (error) {
            if (error.code === 11000) {
               return res.status(409).json({ message: 'The username or email is already in use' })
            }
            return res.status(500).json({ message: 'Internal server error' })
        }
       
    },

    async loginUser (req, res) {
        const { idToken, email } = req.body

        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken)
            console.log('usuario autenticado', decodedToken)
            res.status(200).json({ message:'User auth CORRECT', userId: decodedToken.uid })
        } catch (error) {
            console.log('Token verify ERROR', error)
            res.status(401).json({ message: 'Unauthorized: token is invalid' })
        }
    }
    
}

module.exports = RegistryController