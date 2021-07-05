const { Router } = require("express")
const { addTrait, deleteTrait, getTraitByRdv, getAllTraits,getTraitByPatient } = require('../controllers/traitmentController')
const {adminCheck } = require("../lib/security")

const router = Router()

router.post('/add', addTrait)
router.delete('/:id', deleteTrait)
router.get('/',adminCheck, getAllTraits)
router.get('/rdv/:id', getTraitByRdv)
router.get('/patient/:id',getTraitByPatient)

module.exports = router;