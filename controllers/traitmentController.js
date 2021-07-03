const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Trait = getRepository("traitment")

const addTrait = (req,res) => {
    const {rdvId , description} = req.body
    Trait.save({rdvId,description})
    .then(hor => res.send(success("insertion avec success ", hor)))
    .catch(err => {
        res.send(error(err.message));
    })

}
const getAllTraits = (req,res) => {
    Trait.find()
    .then(trait => {
        res.send(success("liste d'rdv : ", trait))
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
const getTraits = (req,res) => {
    Trait.find({rdvId:req.params.id})
    .then(traits => {
        res.send(success("liste de traitement : ", traits))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

module.exports = { addTrait, deleteTrait, getTraits, getAllTraits } 