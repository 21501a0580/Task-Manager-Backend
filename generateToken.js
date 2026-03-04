const jwt = require('jsonwebtoken');

const generateToken = (_id, role) =>{
    return jwt.sign(
        {
            id:_id,
            role:role,
        },
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );
};

module.exports = generateToken;