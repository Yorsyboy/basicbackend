import Jwt from "jsonwebtoken";

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: "yours truly"
            }
            const secret = "some super secret"
            const options = {}
            Jwt.sign(payload, secret, options, (err, token) => {
                if(err) return reject(err)
                resolve(token)
            })
        })
    }
} 