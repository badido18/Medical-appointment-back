const { Router } = require("express")
const { addConseil, deleteConseil, getConseils , getAllConseils , getDemandeConseils } = require('../controllers/conseilController')
const {adminCheck } = require("../lib/security")

const router = Router()

router.post('/add', addConseil)
router.get('/:id', getConseils)
router.get('/reqs/:id', getDemandeConseils)
router.delete('/:id', deleteConseil)
router.get('/', adminCheck, getAllConseils)

module.exports = router;