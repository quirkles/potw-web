import z, { ZodError } from "zod";

const configSchema = z.object({
  spotifyClientId: z.string(),
  oauthRedirectUrl: z.string(),
  functionsUrl: z.string(),
  firebase: z.object({
    apiKey: z.string(),
    authDomain: z.string(),
    projectId: z.string(),
    storageBucket: z.string(),
    messagingSenderId: z.string(),
    appId: z.string(),
    measurementId: z.string(),
  }),
});

type Config = z.infer<typeof configSchema>;

let config: Config | undefined;

export function getConfig(): Config {
  if (config) {
    return config;
  }
  const maybeConfig: Config = {
    spotifyClientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string,
    oauthRedirectUrl: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI as string,
    functionsUrl: process.env.NEXT_PUBLIC_FUNCTIONS_URL as string,
    firebase: {
      apiKey: process.env.NEXT_PUBLIC_APIKEY as string,
      authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN as string,
      projectId: process.env.NEXT_PUBLIC_PROJECTID as string,
      storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET as string,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID as string,
      appId: process.env.NEXT_PUBLIC_APPID as string,
      measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID as string,
    },
  };
  try {
    config = configSchema.parse(maybeConfig);
  } catch (e) {
    console.error("Invalid config:");
    console.error((e as ZodError).format());
  }
  return config as Config;
}
