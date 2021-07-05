const { Router } = require("express")
const { getUser, getUsers, addUser, deleteUser, login ,getMedecins ,getPatients ,getPatient,getMedecin,modifMedcin,modifPatient,modifUser} = require('../controllers/authController')
const {adminCheck,tokenCheck} = require("../lib/security")
const router = Router()

router.get('/', adminCheck, getUsers)
router.get('/patients',adminCheck,  getPatients)
router.get('/medecins', getMedecins)
router.get('/:id',adminCheck, getUser)
router.get('/patient/:id', getPatient)
router.get('/medecin/:id', getMedecin)
router.post('/add',adminCheck , addUser)
router.delete('/:id',adminCheck, deleteUser)
router.post('/', login)

router.put('/:id',adminCheck, modifUser)
router.put('/patient/:id',adminCheck, modifPatient)
router.put('/medecin/:id',adminCheck, modifMedcin)

module.exports = router;
