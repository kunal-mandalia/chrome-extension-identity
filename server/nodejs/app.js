const express = require('express')
const { OAuth2Client } = require("google-auth-library")
require('dotenv').config()

const app = express()
const port = 8080
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


app.get('/public', (req, res) => {
    return res.json({
        message: "public route is accessible to everyone"
    })
})

async function getTokenInfo(accessToken) {
    try {
        const token = await client.getTokenInfo(accessToken)
        return token
    } catch (e) {
        console.error(e.message)
        return null
    }
}
app.get('/private', async (req, res) => {
    // get access token
    const authHeader = req.header("Authorization")
    if (!authHeader) return res.sendStatus(400)

    const accessToken = authHeader.split(" ")[1]

    // verify user
    const tokenInfo = await getTokenInfo(accessToken)
    if (!tokenInfo) return res.sendStatus(401)

    // return data about user or token
    return res.json({
        message: "successfully accessed /private route",
        ...tokenInfo
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// async function testToken() {
//     const accessToken = [
//         {
//             name: 'invalid',
//             value: process.env.AUTH_TOKEN_INVALID,
//         },
//         {
//             name: 'expired',
//             value: process.env.AUTH_TOKEN_EXPIRED,
//         },
//         {
//             name: 'valid',
//             value: process.env.AUTH_TOKEN_VALID
//         }
//     ]
//     const [invalid, expired, valid] = accessToken
//     const token = valid;
//     const tokenInfo = await getTokenInfo(token.value);
//     console.log({ tokenInfo });
// }
// testToken();