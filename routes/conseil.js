const { Router } = require("express")
const { addConseil, deleteConseil, getConseils , getAllConseils } = require('../controllers/conseilController')

const router = Router()

router.post('/add', addConseil)
router.get('/:traitmentid', getConseils)
router.delete('/:id', deleteConseil)
router.get('/all', getAllConseils)

module.exports = router;