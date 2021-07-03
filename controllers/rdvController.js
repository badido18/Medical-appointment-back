const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Rdv = getRepository("rdv")

const deleteRdv= (req,res) => {
    Rdv.delete({id:req.params.id})
    .then( aff =>
        res.send(success("suppression avec succes",aff))
    )
    .catch(err => {
        res.send(error(err.message));
    })
}
const getRdv = (req,res) => {
    Rdv.findOne({id:req.params.id})
    .then(rdv => {
        res.send(success("le rdv : ", rdv))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}
const getAllRdvs = (req,res) => {
    Rdv.find()
    .then(rdvs => {
        res.send(success("liste d'rdv : ", rdvs))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}
const getRdvsMedecin = (req,res) => {
    Rdv.find({medecinId:req.params.id})
    .then(rdvs => {
        res.send(success("liste d'rdv : ", rdvs))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}
const getRdvsPatient = (req,res) => {
    Rdv.find({patientId:req.params.id})
    .then(rdvs => {
        res.send(success("liste d'rdv : ", rdvs))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}
const setRdvState = (req,res) => {
    //const {state} = req.body
    Rdv.update({id : req.params.id},{
        ...req.body
    })
    .then( aff =>
        res.send(success("operation avec succes",aff))
    )
    .catch(err => {
        res.send(error(err.message));
    })

}
const verifRdv = (req,res) => {
    const prerdv = req.body
    Rdv.findOne({id:req.params.id})
    .then( rdv => {
        if (rdv.date == prerdv.date && rdv.patientId == prerdv.patientId && rdv.medecinId == prerdv.medecinId && rdv.plageHorraireId == prerdv.plageHorraireId)
            res.send(success("operation avec succes",{result:true}))
        else
            res.send(success("operation avec succes",{result:false}))

    }
    )
    .catch(err => {
        res.send(error(err.message));
    })
}

const addRdv = (req,res) => {
    const { patientId, medecinId , plageHorraireId , state , date } = req.body
    try{
        Rdv.find({plageHorraireId,date,medecinId})
        .then(rdvs => {
            if(!rdvs.length)
                Rdv.save({
                    patientId, medecinId , plageHorraireId , state , date 
                })
                .then( hor => 
                    res.send(success("insertion avec success ", hor))
                )
                .catch(err => {
                    res.send(error(err.message));
                })
            else
                res.send(error("creneau horraire deja pris"))
        })
        .catch(err => {
            res.send(error(err.message));
        })
    }
    catch(err)
    {
        res.send(error(err.message))
    }
}

const getRdvPris = (req,res) => {
    const medecinId = req.params.id
    const {date} = req.body
    Rdv.find({
        date,medecinId
    })
    .then( rdvs => {
        let plageIds = []
        rdvs.forEach(rdv => {
            plageIds.push(rdv.plageHorraireId)
        });
        res.send(success("les rendez vous pris pour la date " + date,plageIds) )
    }
    )
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = { addRdv, deleteRdv, getRdv, getAllRdvs , getRdvsMedecin,  getRdvsPatient ,setRdvState ,verifRdv ,getRdvPris } 
