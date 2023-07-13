const jwt = require('jsonwebtoken')




module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Unauthorized or Not Authenticated");

    jwt.verify(token, 'dafedf4a451565e7634efc27eeba4f90', async (err, payload) => {
        if (err)
            return res.status(403).send("Invalid Token!");

        req.userId = payload.id;
        isAdmin = payload.isAdmin;
        next()
    });

}