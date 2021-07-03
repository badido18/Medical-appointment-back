const { getRepository } = require("typeorm")
const bcrypt = require('bcrypt')

const {generateToken} = require('../lib/token')
const { error, success } = require("../lib/response")

const User = getRepository("user")
const Patient = getRepository("patient")
const Medecin = getRepository("medecin")


const getUsers = (req, res) => {
    User.find()
    .then(users => {
        res.send(success("list of users : ", users))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}


const getPatients = (req, res) => {
    Patient.find()
    .then(users => {
        res.send(success("list of patients : ", users))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

const getMedecins = (req, res) => {
    Medecin.find()
    .then(users => {
        res.send(success("list of medecins : ", users))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

const getPatient = (req,res) => {
    Patient.findOne({id:req.params.id})
    .then(patient =>  res.send(success("patient of patientid " + req.params.id, {...patient})))
    .catch (err => res.send(error(err.message)))
}


const getMedecin = (req,res) => {
    Medecin.findOne({id:req.params.id})
    .then(med =>  res.send(success("medcin of medcinId " + req.params.id, {...med})))
    .catch (err => res.send(error(err.message)))
}



const getUser = (req, res) => {
    User.findOne({ id: parseInt(req.params.id) })
    .then(user => {
        if (user){
            if (user.type==="patient")
                Patient.findOne({userId : user.id})
                .then(patient =>  res.send(success("patient of userid " + req.params.id, {...user,...patient})))
                .catch (err => res.send(error(err.message)))
            else if (user.type==="medecin")
                Medecin.findOne({userId : user.id})
                .then(medecin =>  res.send(success("medecin of userid " + req.params.id, {...user,...medecin})))
                .catch (err => res.send(error(err.message)))
            else
                res.send(error("false user type."))
        }
        else {
            res.send(error("no user found."))
        }
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

const addUser = async (req, res) => {
    const { email, password, type , body } = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        const hshpaswd = await bcrypt.hash(password, salt)

        User.save({
            email,
            password : hshpaswd ,
            type,
        })
        .then(user => {
            if (type==="patient")
                Patient.save({...body, userId : user.id})
                .then(patient => res.send(success("patient cree avec succes", patient)))
                .catch (err => res.send(error(err.message)))
            if (type==="medecin")
                Medecin.save({...body, userId : user.id})
                .then(patient => res.send(success("medecin cree avec succes", patient)))
                .catch (err => res.send(error(err.message)))
        })
        .catch(err => {
            res.send(error(err.message));
        })

    } catch (err) {
        console.log(err)
        res.send(error(err.message));
    }
}

const deleteUser = (req, res) => {
    User.delete({ id: req.params.id })
    .then(user => {
        Patient.delete({userId :req.params.id  })
        .then(patient => {
            if(!patient.affected)
                Medecin.delete({userId :req.params.id  })
                .then(med => med.affected ? res.send(success("Medecin supprime avec succes", med)): res.send(success("Aucune suppression n'a ete effectue")) )
                .catch (err => res.send(error(err.message)))
            else
                res.send(success("patient supprime avec succes", patient))
        })
        .catch (err => res.send(error(err.message)))
        
    })
    .catch(err => {
        res.send(error(err.message));
    })
}


const login = (req, res) => {
    const { email, password } = req.body;

    console.log(email,password)
    if (!email || !password) {
        res.status(400).send(error("invalid payload: " + JSON.stringify(req.body)))
    }

    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            res.send(error("no account found."))
            return
        }
        else {
            const isMatch = bcrypt.compareSync(password, user.password)
            if (!isMatch) {
                res.send(error("incorrect password"))
            } else {
                const token = generateToken({ id: user.id , type: user.type})
                res.send(success("login success !",{id:user.id,type: user.type,token}))
            }
        }
    })
    .catch(err => {
        console.log(err)
        res.send(error("Unexpected error occured"))
    })
}


module.exports = { addUser, deleteUser, login , getUser , getUsers ,getPatients,getMedecins , getMedecin , getPatient} 
