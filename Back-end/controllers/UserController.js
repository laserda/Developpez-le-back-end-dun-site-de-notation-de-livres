const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Hachage du mot de passe de l'utilisateur, ajout de
l'utilisateur à la base de données.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })

            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json(error))
};

/**
 * Vérification des informations d'identification de
l'utilisateur ; renvoie l’_id de l'utilisateur depuis la
base de données et un token web JSON signé
(contenant également l'_id de l'utilisateur).
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.login = (req, res, next) => {
    console.log("1")
    User.findOne({ email: req.body.email })
        .then(user => {
            console.log("2")
            if (user === null) {
                console.log("3")
                res.status(401).json({ message: "Utilisateur ou mot de passe incorrect" });
            } else {

                console.log("4")
                console.log("user")
                console.log(user)
                console.log("req.body")
                console.log(req.body)

                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if (!result) {
                            res.status(401).json({ message: "Utilisateur ou mot de passe incorrect" });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    "RANDOM",
                                    { expiresIn: "24h" }
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json(error))
            }
        })
        .catch(error => res.status(500).json(error))
};