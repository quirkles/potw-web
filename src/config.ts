import z from "zod";

const configSchema = z.object({
    spotifyClientId: z.string(),
    oauthRedirectUrl: z.string(),
    functions: z.object({
        verifyOtpUrl: z.string(),
        handleSpotifyLoginUrl: z.string(),
        handleGoogleUrl: z.string(),
        handleEmailUrl: z.string(),
    })
});

type Config = z.infer<typeof configSchema>;

let config: Config | undefined;

export function getConfig(): Config {
    if(config) {
        return config;
    }
    const maybeConfig: unknown = {
        spotifyClientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        oauthRedirectUri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI,
        functions: {
            verifyOtpUrl: process.env.NEXT_PUBLIC_FUNCTIONS_URL_VERIFY_OTP,
            handleSpotifyLoginUrl: process.env.NEXT_PUBLIC_FUNCTIONS_URL_HANDLE_SPOTIFY_LOGIN,
            handleGoogleUrl: process.env.NEXT_PUBLIC_FUNCTIONS_URL_HANDLE_GOOGLE_LOGIN,
            handleEmailUrl: process.env.NEXT_PUBLIC_FUNCTIONS_URL_HANDLE_EMAIL_LOGIN,
        }
    }
    config = configSchema.parse(maybeConfig);
    return config;
}