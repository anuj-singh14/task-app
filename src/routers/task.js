const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {    
    try {
        const match = {}, sort = {}, query = req.query
        if (query.completed) {
            match.completed = query.completed === 'true'
        }
        if (query.sortBy) {
            const parts = query.sortBy.split(':')
            sort[parts[0]] = (parts[1] === 'desc') ? -1 : 1
        }
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(query.limit),
                skip: parseInt(query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const upd = Object.keys(req.body)
    const allowed = ['description', 'completed']
    const isValid = upd.every((update) => allowed.includes(update))
    if (!isValid) {
        return res.status(400).send('Invalid update')
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        upd.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router