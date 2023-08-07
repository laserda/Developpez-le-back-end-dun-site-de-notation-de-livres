const Book = require("../models/Book");
const fs = require('fs');

/**
 * Renvoie un tableau de tous les livres de la base de données
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAllBook = (req, res, next) => {
    Book.find()
        .then((books) => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}

/**
 * Renvoie le livre avec l’_id fourni.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => res.status(200).json(book))
        .catch(error => res.status(400).json({ error }));
}

/**
 * Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getBestratingBook = (req, res, next) => {

}


exports.createBook = (req, res, next) => {

    console.log("createBook")
    console.log(req.body)
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    book.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.updateBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject.userId;
    console.log(bookObject);

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

exports.deleteBook = (req, res, next) => {

}

/**
 * Définit la note pour le user ID fourni.
La note doit être comprise entre 0 et 5.
L'ID de l'utilisateur et la note doivent être ajoutés au
tableau "rating" afin de ne pas laisser un utilisateur
noter deux fois le même livre.
Il n’est pas possible de modifier une note.
La note moyenne "averageRating" doit être tenue à
jour, et le livre renvoyé en réponse de la requête.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.ratingBook = (req, res, next) => {
    console.log("req.bodyratingBook")
    console.log(req.body)

    const ratingObject = { ...req.body };

    console.log("req.params.id");
    console.log(req.params.id);

    Book.findOne({ _id: req.params.id })
        .then((book) => {

            console.log(book.ratings.find(r => r.userId == req.auth.userId));
            if (book.ratings.find(r => r.userId == req.auth.userId) != undefined) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                let bookObject = {...book._doc}
                console.log(bookObject);

                console.log("book.ratings.find(r => r.userId == req.auth.userId)");
                let ratings = [...book.ratings]
                console.log("ratings");
                console.log(ratings);
                ratings.push({userId:ratingObject.userId,grade:ratingObject.rating })
                
                bookObject.ratings = [...ratings];
                console.log(bookObject);

                Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
                    .then((book) => res.status(200).json(book))
                    .catch(error => res.status(401).json({ error }));
            }
            // if (book.userId != req.auth.userId) {
            //     res.status(401).json({ message : 'Not authorized'});
            // } else {
            //     Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id})
            //     .then(() => res.status(200).json({message : 'Objet modifié!'}))
            //     .catch(error => res.status(401).json({ error }));
            // }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}