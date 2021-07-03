const express = require("express")
const { createConnection, EntitySchema } = require("typeorm")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
require('dotenv').config()

createConnection({
    "type": process.env.DB_TYPE,
    "host": process.env.DB_HOST, 
    "port": process.env.DB_PORT, 
    "username": process.env.DB_USERNAME, 
    "password": process.env.DB_PASSWORD, 
    "database": process.env.DB_DNAME,
    "uri": process.env.DB_URI,
    "synchronize": true, 
    "logging": true, 
    "ssl" : { rejectUnauthorized: false },
    entities : [
        new EntitySchema(require("./types/Medecin.json")),
        new EntitySchema(require("./types/Rdv.json")),
        new EntitySchema(require("./types/User.json")),
        new EntitySchema(require("./types/Patient.json")),
        new EntitySchema(require("./types/Traitment.json")),
        new EntitySchema(require("./types/Conseil.json")),
        new EntitySchema(require("./types/PlageHorraire.json")),
        new EntitySchema(require("./types/MedecinHorraire.json")),
    ]
})
.then(() => {
    const router = require("./routes/index")
    app.use("/", router)
    app.listen( process.env.PORT || 8001, () => {
        console.log("Server listening ...")
    })
})
.catch(err => {
    console.error(err.message)
})

