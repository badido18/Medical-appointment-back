const { Router } = require("express")
const { getHorraires ,getHorraire , getMedecinHorraires,addHorraire,addMedecinHorraires ,deleteHorraire , deleteHorraireMedecin} = require('../controllers//horraireController')
const {adminCheck } = require("../lib/security")
const router = Router()

router.get('/:id', getHorraire)
router.get('/', adminCheck, getHorraires)
router.get('/med/:id', getMedecinHorraires)
router.delete('/:id',adminCheck,deleteHorraire)
router.delete('/:medecinId/:id',adminCheck,deleteHorraireMedecin)
router.post('/add',adminCheck, addHorraire)
router.post('/add/:id',adminCheck, addMedecinHorraires)

module.exports = router;