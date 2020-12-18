const path = require('path')
const router = require('express').Router()
router.get('/notes', (req, res)=>{
    res.sendfile(path.join(__dirname, '../public/notes.html'))
})
router.get('/*', (req, res)=>{
    res.sendfile(path.join(__dirname, '../public/index.html'))
})
module.exports = router;