const envs = process.env;

module.exports={
  "development": {
    "username": envs.DB_USER,
    "password": envs.DB_PASSWORD,
    "database": envs.DB_DATABASE,
    "host": envs.DB_HOST,
    "dialect": envs.DB_DIALECT
  },
  "test": {
    "username": envs.DB_USER,
    "password": envs.DB_PASSWORD,
    "database": envs.DB_DATABASE,
    "host": envs.DB_HOST,
    "dialect": envs.DB_DIALECT
  },
  "production": {
    "username": envs.DB_USER,
    "password": envs.DB_PASSWORD,
    "database": envs.DB_DATABASE,
    "host": envs.DB_HOST,
    "dialect": envs.DB_DIALECT
  }
}
