if (typeof window !== 'undefined') {
  console.log(window.location.href);
}

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  baseUrl: typeof window !== 'undefined' ? window.location.origin : ''
};