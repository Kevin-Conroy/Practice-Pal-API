module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: "postgres://mugtijkvnahlfq:61a323dbf85fc8a2fea8bca008ee286d2fe738df5d4f35f35d5a41e48055b8b0@ec2-35-174-56-18.compute-1.amazonaws.com:5432/d2haivfqvhl4s4",
    JWTSECRET: process.env.JWTSECRET || 'ThisismyJWTsecret'
  }