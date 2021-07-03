const {Router} = require("express")

const auth = require("./auth")
const conseil = require("./conseil")
const rdv = require("./rdv")
const traitment = require("./traitment")
const horraire = require("./horraire")

const router = Router()

router.use("/auth", auth)
router.use("/conseil", conseil)
router.use("/rdv", rdv)
router.use("/traitment", traitment)
router.use("/horraire", horraire)

module.exports = router