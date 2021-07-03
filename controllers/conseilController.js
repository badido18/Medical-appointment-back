const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Conseil = getRepository("conseil")

const addConseil = (req,res) => {
    const {traitmentId , type , description} = req.body
    Conseil.save({traitmentId,type,description})
    .then(hor => res.send(success("insertion avec success ", hor)))
    .catch(err => {
        res.send(error(err.message));
    })
}
const deleteConseil= (req,res) => {
    Conseil.delete({id:req.params.id})
    .then( aff =>
        res.send(success("suppression avec succes",aff))
    )
    .catch(err => {
        res.send(error(err.message));
    })
}

const getConseils = (req,res) => {
    Conseil.find({traitmentId:req.params.id , type:"answer"})
    .then(cons => {
        res.send(success("liste de conseils : ", cons))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

const getDemandeConseils = (req,res) => {
    Conseil.find({traitmentId:req.params.id , type:"request"})
    .then(cons => {
        res.send(success("liste des demande conseils : ", cons))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

const getAllConseils = (req,res) => {
    Conseil.find()
    .then(cons => {
        res.send(success("liste de conseils : ", cons))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}


module.exports =  { addConseil, deleteConseil, getConseils , getAllConseils ,getDemandeConseils}