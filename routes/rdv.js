const { Router } = require("express")
const { addRdv, deleteRdv, getRdvs, getAllRdvs , getRdvsMedecin } = require('../controllers/rdvController')

const router = Router()

router.post('/add', addRdv)
router.delete('/:id', deleteRdv)
router.get('/all', getAllRdvs)
router.get('/:id', getRdvs)
router.get('/medecin/:id', getRdvsMedecin)

module.exports = router;