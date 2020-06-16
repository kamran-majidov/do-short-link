const bcrypt = require('bcrypt')
const config = require('config')
const {check, validationResult} = require('express-validator')
const {Router} = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post(
    '/register',
    [
        check('email', 'Invalid email').isEmail(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Enter the correct email address and password',
                    errors: errors.array()
                })
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'A user with this username exists'})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email, password: hashedPassword})
            await user.save()
            res.status(201).json({message: 'User created. You can login now.'})

        } catch (e) {
            res.status(500).json({message: 'Something is wrong. Try again!'})
        }
    }
)

router.post(
    '/login',
    [
        check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'You could not log in.',
                    errors: errors.array()
                })
            }
            const {email, password} = req.body
            const user = await User.findOne({email})
            const isMatch = await bcrypt.compare(password, user.password)

            if (!user || !isMatch) {
                return res.status(400).json({message: 'You entered something wrong!'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Something is wrong. Try again!'})
            console.log('/register', e)
        }
    }
)

module.exports = router