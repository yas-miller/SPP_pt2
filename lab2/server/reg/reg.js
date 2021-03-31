const express = require('express');
const regRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = require('../dao/users');

regRouter.post('/login', (req, res) =>{
    let visitor_id = -1;
    visitor_id = users.findIndex(visitor => visitor.email === req.body.email);

    if (visitor_id >= 0) {
        const passwordEven = bcrypt.compareSync(req.body.password, users[visitor_id].passwordHash);
        if (passwordEven) {
            const token = jwt.sign({
                email: users[visitor_id].email
            }, process.env.SECRET_KEY, {expiresIn: 60 * 60});

            console.log("send cookie");
            res.status(200)
                .cookie('token',
                    'Bearer '+ token,
                    {
                        HttpOnly: true,
                        secure: false,
                        //maxAge: 60 * 60 * 60
                    })
                .json({message_jwt: "jwt is created"});

        } else {
            res.status(401).json({message: "Passwords don't match"});
        }
    } else {
        res.status(404).json({message: "User with this email was not found"});
    }
});

regRouter.post('/register', (req, res) => {
    let id = -1;
    id = users.findIndex(visitor => visitor.email === req.body.email);

    if (id >= 0) {
        res.status(409).json({
            message: "User with this email already exists"
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = {
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        };

        users.push(user);
        console.log(users);
        res.status(201).json(user);
    }
});

module.exports = regRouter;
