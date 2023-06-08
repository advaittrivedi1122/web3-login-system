const jwt = require('jsonwebtoken')
require('dotenv').config();

export async function validateToken(req: any, res: any, next: any) : Promise<any> {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err: any, decoded: any) => {
            if(err){
                res.status(401).json({
                    message: "User not authorized"
                });
            } 

            req.user = decoded.user;
            next();
        })
        if(!token){
            res.status(401).json({
                message: 'User not authorized or token is missing'
            });
        }
    }
}

module.exports = { validateToken } 