const express = require("express")
const { createConnection, EntitySchema } = require("typeorm")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

createConnection({
    "type": "postgres", 
    "host": "projtdm", 
    "port": 5432, 
    "username": "postgres", 
    "password": "0000", 
    "database": "projtdm",
    "synchronize": true, 
    "logging": true, 
    entities: [
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
    const router = require("./routes")
    app.use("/", router)

    app.listen(8000, () => {
        console.log("Server listening ...")
    })
})
.catch(err => {
    console.log(err.message)
})

