const bcrypt = require('bcrypt')
const admin = require('../config/fireBaseAdmin.js')
const User = require('../models/user.model.js')


const RegistryController = {
    
    async registryUser (req, res) {
        const { idToken, username, email, password, profileimage } = req.body
        try {
            console.log(idToken)
            if (!idToken || !username || !email || !password) {
               return res.status(400).json({ message: 'All fields must be completed' })
            }
        
        try {
            const decodedToken = await admin.auth().verifyIdToken(idToken)
            const { uid } = decodedToken
            console.log(decodedToken)  
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'Invalid Firebase token' })
        }
    
            const existUser = await User.findOne({ $or: [{ uid }, { email }] })
            if ( existUser) {
                res.status(409).json({ message: 'This user is already registered' })
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
    
            res.status(201).json({
                message: 'User registry correct',
                user: {
                    uid: newUser.uid,
                    username: newUser.username,
                    email: newUser.email,
                    profileimage: newUser.profileimage
                }
            })
        } catch (error) {
            if (error.code === 11000) {
                res.status(409).json({ message: 'The username or email is already in use' })
            }
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = RegistryController