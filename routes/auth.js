const { Router } = require("express")
const { addUser, linkUserId, deletetUser, login } = require('../controllers/authController')

const router = Router()

router.post('/add', addUser)
router.post('/link/:id', linkUserId)
router.delete('/:id', deletetUser)
router.post('/', login)

module.exports = router;