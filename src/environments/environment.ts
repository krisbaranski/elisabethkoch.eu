// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
if (typeof window !== 'undefined') {
  console.log(window.location.href);
}

// src/environments/environment.ts
export const environment = {
  production: false,
  baseUrl: typeof window !== 'undefined' ? window.location.origin : '',
};
