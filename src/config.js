module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: "postgresql://practice_pal_admin@localhost/practice_pal_api",
    JWTSECRET: process.env.JWTSECRET || 'ThisismyJWTsecret'
  }