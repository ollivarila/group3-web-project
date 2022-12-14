export const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://shopping-list-app.fly.dev'
