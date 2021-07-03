const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Horraire = getRepository("plageHorraire")
const MedecinHorraire = getRepository("medecinhorraire")


const getHorraires = (req,res) => {
    Horraire.find()
    .then(hor => {
        res.send(success("liste d'horraire : ", hor))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}


const getHorraire = (req,res) => {
    Horraire.findOne({id:req.params.id})
    .then(hor => {
        res.send(success("l'horraire' : ", hor))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

const getMedecinHorraires = (req,res) => {
    MedecinHorraire.find({medecinId:req.params.id})
    .then(hor => {
        res.send(success("liste d'horraire du medecin id "+ req.params.id, hor))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}
const addHorraire = (req,res) => {
    const { heureDebut , heureFin } = req.body
    try{
        Horraire.save({
            heureDebut,
            heureFin
        })
        .then( hor => 
            res.send(success("horraire ajoute avec succes " + heureDebut + "H -- " + heureFin + "H ", hor))
        )
        .catch(err => {
            res.send(error(err.message));
        })
    }
    catch(err)
    {
        res.send(error(err.message))
    }

}

const deleteHorraire = (req,res) => {
    Horraire.delete({ id: req.params.id })
    .then(aff => {
        MedecinHorraire.delete({plageHorraireId:req.params.id}).then(
            res.send(success("suppression avec succes",aff))
        )
        .catch(err => {
            res.send(error(err.message));
        })
    } )
    .catch(err => {
        res.send(error(err.message));
    })
}


const deleteHorraireMedecin = (req,res) => {
    MedecinHorraire.delete({ medecinId: req.params.medecinId , plageHorraireId: req.params.id })
    .then(aff => {
        res.send(success("suppression avec succes",aff))
    } )
    .catch(err => {
        res.send(error(err.message));
    })
}


const addMedecinHorraires = (req,res) => {
    const { medecinId , plageHorraireId } = req.body
    try{
        MedecinHorraire.save({
            medecinId,
            plageHorraireId
        })
        .then( hor => 
            res.send(success("horraire du medecin "+ medecinId + "ajoute avec succes plage :  " + plageHorraireId, hor))
        )
        .catch(err => {
            res.send(error(err.message));
        })
    }
    catch(err)
    {
        res.send(error(err.message))
    }
}


module.exports= { getHorraires ,getHorraire, getMedecinHorraires,addHorraire,addMedecinHorraires ,deleteHorraire , deleteHorraireMedecin}
