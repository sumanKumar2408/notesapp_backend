const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authenticate = async(req, res, next) => {
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decodedData = jwt.verify(token, SECRET_KEY);
            req.id = decodedData.id;
            next();
        }
        catch(err){
            if(err.message === "jwt expired")
                return res.status(400).json("Token Expired");
            else if(err.message === "jwt malformed")
                res.status(400).json("Please Login");
            
        }
};

module.exports = authenticate;