import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client();
const GOOGLE_CLIENT_IDS = [
    process.env.GOOGLE_WEB_CLIENT_ID,
    process.env.GOOGLE_ANDROID_CLIENT_ID,
    // process.env.GOOGLE_IOS_CLIENT_ID!,
];
export async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_IDS,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
        throw new Error("Token do Google inválido");
    }
    return {
        googleId: payload.sub,
        email: payload.email,
        emailVerified: payload.email_verified,
        name: payload.name,
        picture: payload.picture,
    };
}
//# sourceMappingURL=googleAuth.service.js.map