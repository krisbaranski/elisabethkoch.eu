export default import('../dist/elisabethkoch.eu/server/main.server.mjs').then(
  (module) => module.reqHandler || module.app(),
);
