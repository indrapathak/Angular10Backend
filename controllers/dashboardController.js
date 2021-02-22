
const moment = require('moment');

const userSchema = require('../models/user');


async function addUser(req, res) {
    console.log("the add user function is called",)
    try {



        let newUser = {
            "name": req.body.name,
            "email": req.body.email,
            "mobile": req.body.mobile,
            "password": req.body.password,
            "userType": req.body.userType,
            "companyId": req.body.companyId
        }

        let user = new userSchema(newUser);
        return user.save()
            .then(status => {
                console.log("Status of save user is", status)
                return res.status(200).send({ "message": "User Added Successfully" })
            })
            .catch(e => {
                //to return db query errors
                console.log("Error:", e)
                if (e.code === 11000) {
                    return res.status(400).send({ "message": "User already exists" })
                }
                else {
                    return res.status(400).send({ "message": "Internal Server Error!" })
                }
            })

    }
    catch (e) {
        res.status(400).send({
            "message": "Error in saving user",
            "error": e
        })
    }
}


async function updateUser(req, res) {
    console.log("the update user function is called", req.params)
    try {

        let newUser = {}
        let email = req.params.email;

        for (let bodyParam in req.body) {
            newUser[bodyParam] = req.body[bodyParam]
        }

        userSchema.updateOne({ "email": email }, { "$set": newUser })
            .then(status => {
                if (status.n == 1 && status.nModified == 1) {

                    return res.status(200).send({ "message": "User Details Updated Successfully" })
                }
                else if (status.n == 1 && status.nModified == 0) {
                    return res.status(400).send({ "message": "User Details Already Updated" })
                }
                else {
                    return res.status(400).send({ "message": "User Not Found" })
                }
            })
            .catch(e => {
                console.log("Query catch error", e)
                return res.status(400).send({ "message": "Server Error" })
            })

    }
    catch (e) {
        res.status(400).send({
            "message": "Error in saving user",
            "error": e
        })
    }
}

async function projectStart(req, res) {
    console.log("wr are inside project start function")
    try {
        res.status(200).send(
            "The Angular 10 Project Backend Is Running"
        )
    }
    catch (e) {
        res.status(400).send({
            "Error": e
        })

    }
}


async function fetchUser(req, res) {
    try {
        userSchema.find({})
            .then(data => {
                console.log("the data of the user is ", data)
                res.status(200).send({
                    "data": data
                })
            })
            .catch(e => {
                console.log("the error occured in the fetch user in", e)
                res.status(400).send({
                    "Error": e
                })
            })
    }
    catch (e) {
        res.status(400).send({
            "message": "Error in saving user",
            "error": e
        })
    }
}

async function fetchParticularUser(req, res) {
    try {
        console.log("The email value in fetch particular user is", req.body.email, req.params)
        let email = req.params.email;
        userSchema.find({ "email": email })
            .then(data => {
                console.log("the data of the user is ", data)
                res.status(200).send({
                    "data": data
                })
            })
            .catch(e => {
                console.log("the error occured in the fetch user in", e)
                res.status(400).send({
                    "Error": e
                })
            })
    }
    catch (e) {
        res.status(400).send({
            "message": "Error in saving user",
            "error": e
        })
    }
}

async function deleteUser(req, res) {
    try {
        console.log("the incoming email from front end is", req.params.email)
        let email = req.params.email;
        userSchema.deleteOne({ "email": email })
            .then(status => {
                console.log("the status after deletion is ", status)
                if (status.n == 0 && status.deletedCount == 0) {

                    return res.status(200).send({ "message": "User Not Deleted" })
                }
                else if (status.n == 1 && status.deletedCount == 1) {
                    return res.status(200).send({ "message": "User Deleted Successfuly" })
                }
                else {
                    return res.status(400).send({ "message": "User Not Found" })
                }
            })
            .catch(e => {
                console.log("the error occured in the delete user in", e)
                res.status(400).send({
                    "Error": e
                })
            })
    }
    catch (e) {
        res.status(400).send({
            "message": "Error in deleting user",
            "error": e
        })
    }
}


module.exports = {
    projectStart,
    addUser,
    fetchUser,
    fetchParticularUser,
    deleteUser,
    updateUser
}

