const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Trait = getRepository("traitment")
const Rdv = getRepository("rdv")
const Medecin = getRepository("medecin")

const addTrait = (req,res) => {
    const {rdvId , description } = req.body
    Rdv.findOne({id:rdvId}).then(
        rdv => {
            Medecin.findOne({id:rdv.medecinId})
            .then(
                med => {
                    Trait.save({
                        rdvId : rdv.id ,
                        patientId : rdv.patientId,
                        date : rdv.date,
                        plageHorraireId : rdv.plageHorraireId,
                        medecinId:rdv.medecinId,
                        medecinNom : med.fullName,
                        medecinSpeciality: med.speciality,
                        medecinCity : med.city ,
                        description})
                    .then(hor => res.send(success("insertion avec success ", hor)))
                    .catch(err => {
                        res.send(error(err.message));
                    })
                }
            )
            .catch(err => {
                res.send(error(err.message));
            })

            
        }
    )
    .catch(err => {
        res.send(error(err.message));
    })
}
const getAllTraits = (req,res) => {
    Trait.find()
    .then(trait => {
        res.send(success("liste d'trait: ", trait))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}
const deleteTrait = (req,res) => {
    Trait.delete({id:req.params.id})
    .then( aff =>
        res.send(success("suppression avec succes",aff))
    )
    .catch(err => {
        res.send(error(err.message));
    })
}

const getTraitByRdv = (req,res) => {
    Trait.find({rdvId:req.params.id})
    .then(traits => 
		    res.send(success("les traitment ",traits)))
    .catch(err => {
        res.send(error(err.message));
    })
}

const getTraitByPatient = (req,res) => {
    Trait.find({patientId:req.params.id})
    .then(traits => 
		    res.send(success("les traitment ",traits)))
    .catch(err => {
        res.send(error(err.message));
    })
}


module.exports = { addTrait, deleteTrait, getTraitByRdv, getAllTraits ,getTraitByPatient} 
