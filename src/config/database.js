module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgress',
  password: 'docker',
  database: 'goBarber',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
