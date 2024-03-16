import z from "zod";

const configSchema = z.object({
        spotifyClientId: z.string(),
        oauthRedirectUrl: z.string(),
        functionsUrl: z.string(),
    }
);

type Config = z.infer<typeof configSchema>;

let config: Config | undefined;

export function getConfig(): Config {
    if(config) {
        return config;
    }
    const maybeConfig: Config = {
        spotifyClientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
        oauthRedirectUrl: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI as string,
        functionsUrl: process.env.NEXT_PUBLIC_FUNCTIONS_URL as string,
    }
    config = configSchema.parse(maybeConfig);
    console.log('\n####\n',config ,'\n####\n')
    return config;
}