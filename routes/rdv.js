const { Router } = require("express")
const { addRdv, deleteRdv, getRdv, getAllRdvs , getRdvsMedecin,  getRdvsPatient ,setRdvState , verifRdv ,getRdvPris } = require('../controllers/rdvController')
const {adminCheck } = require("../lib/security")

const router = Router()

router.post('/add', addRdv)
router.put('/:id', setRdvState)
router.delete('/:id', deleteRdv)
router.get('/all',adminCheck, getAllRdvs)
router.get('/patient/:id', getRdvsPatient)
router.get('/:id', getRdv)
router.get('/medecin/:id', getRdvsMedecin)
router.post('/verif/:id',verifRdv)
router.post('/pris/:id',getRdvPris)
module.exports = router;