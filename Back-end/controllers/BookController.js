

/**
 * Renvoie un tableau de tous les livres de la base de données
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAllBook = (req,res, next)=>{

}

/**
 * Renvoie le livre avec l’_id fourni.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getOneBook = (req,res, next)=>{

}

/**
 * Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getBestratingBook = (req,res, next)=>{

}


exports.createBook = (req,res, next)=>{

}

exports.updateBook = (req,res, next)=>{

}

exports.deleteBook = (req,res, next)=>{

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
exports.ratingBook = (req,res, next)=>{

}