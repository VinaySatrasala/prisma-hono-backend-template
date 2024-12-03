import { JWTPayload, SignJWT } from "jose";

export const generateJWT = (payload : JWTPayload,secret : string) => {
    return new SignJWT(payload)
        .setProtectedHeader({alg : 'HS256'})
        .setExpirationTime('1h')
        .sign(new TextEncoder().encode(secret));
}