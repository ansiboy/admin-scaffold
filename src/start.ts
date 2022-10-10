import { createApp, Options } from './app';

export async function start(options: Options) {
  const app = await createApp(options);
  await app.listen(options.port);
  return app;
}
