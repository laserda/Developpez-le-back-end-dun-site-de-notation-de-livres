const sharp = require("sharp");
 
module.exports = async (req, res, next) => {
   try {
    const { buffer, originalname } = req.file;
    const timestamp = Date.now();
    const ref = `${originalname.split(' ').join('_')}${timestamp}.webp`;
    req.file.filename=ref;
    await sharp(buffer)
      .webp({ quality: 20 })
      .toFile("./images/" + ref);      
       
	next();

   } catch(error) {
       res.status(400).json({ error });
   }
};