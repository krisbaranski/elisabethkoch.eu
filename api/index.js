export default async (req, res) => {
  const { reqHandler } =
    await import('../dist/elisabethkoch.eu/server/main.server.mjs');
  return reqHandler(req, res);
};
