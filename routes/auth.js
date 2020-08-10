const router = require('express').Router()
const User = require('../model/User')


//VALIDATION
const joi = require('@hapi/joi')
const Joi = require('@hapi/joi')
const schema = {
    name : Joi.string().min(6).required(),
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(6).required()
}


//POST
router.post('/register',async (req,res) => {

    //Lets validate
    const { error } = Joi.valid(req.body,schema)
    if (error) return res.status(400).send(error.details[0].message)

    const user = new User ({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    })
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err){
        res.status(400).send(err)
    }
})








module.exports = router