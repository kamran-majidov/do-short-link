const {Router} = require('express')
const config = require('config')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middlaware')
const shortid = require('shortid')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const existing = await Link.findOne({from})

        if (existing) {
            return res.json({link: existing})
        }

        const code = shortid.generate()

        const to = `${baseUrl}/t/${code}`
        const link = new Link({
            code, to, from, owner: req.user.userId
        })


        await link.save()
        res.status(201).json({link})

    } catch (e) {
        res.status(500).json({message: 'Something is wrong. Try again!', e})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId})
        res.json(links)
    } catch (e) {
        res.status(500).json({message: 'Something is wrong. Try again!'})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id) // ???
        res.status(200).json(link)
    } catch (e) {
        res.status(500).json({message: 'Something is wrong. Try again!'})
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        await Link.remove({_id: req.params.id})
        res.status(200).json({message: 'Link has been deleted'})
    } catch (e) {
        res.status(500).json({message: 'Something is wrong. Try again!'})
    }
})

module.exports = router