const router = require('express').Router()
const Data = require('../modal/dataSample')

router.post('/', async (req, res) => {
    const newData = new Data(req.body)
    try {
        await newData.save()
        res.status(200).json({ msg: 'Data created' })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const lastForm = await Data.find().sort({ createdAt: -1 }).limit(1)
        res.status(200).json(lastForm)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/', async (req, res) => {
    const data = req.body.data
    try {
        await Data.findByIdAndUpdate(req.body.id, {
            $set: { data }
        })
        res.status(200).json({ msg: 'Data updated' })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/', async (req, res) => {
    try {
        await Data.deleteMany()
        res.status(200).json({ msg: 'Forms cleared' })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router