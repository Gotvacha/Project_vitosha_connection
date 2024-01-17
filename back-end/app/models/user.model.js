module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: Sequelize.STRING,
      unique: true
    }
  }, {
    updatedAt: false,
  });

  User.primaryKey = 'id';

  return User;
};
