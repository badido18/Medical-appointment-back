const { Router } = require("express")
const { getUser, getUsers, addUser, linkUserId, deleteUser, login ,getMedecins ,getPatients } = require('../controllers/authController')
const {adminCheck} = require("../lib/security")
const router = Router()

router.get('/', adminCheck, getUsers)
router.get('/patients',adminCheck,  getPatients)
router.get('/medecins', getMedecins)
router.get('/:id',adminCheck, getUser)
router.post('/add',adminCheck , addUser)
router.delete('/:id',adminCheck, deleteUser)
router.post('/', login)

module.exports = router;