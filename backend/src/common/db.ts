export function isDbEnabled(): boolean {
  return Boolean(process.env.DB_HOST || process.env.DATABASE_URL);
}

export function isPrismaEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
