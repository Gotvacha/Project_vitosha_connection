module.exports = (sequelize, Sequelize) => {
  const Friendship = sequelize.define("friendship", {
    status: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    target_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  }, {
      timestamps: false,   
      id: false,
      indexes: [
        {
          unique: true,
          fields: ['user_id', 'target_id']
        }
      ]
  });

  const User = require('./user.model')(sequelize, Sequelize);

  Friendship.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "id",
    onDelete: "CASCADE",
  });

  Friendship.belongsTo(User, {
    foreignKey: "target_id",
    targetKey: "id",
    onDelete: "CASCADE",
  });

  Friendship.removeAttribute('id');
  
  return Friendship;
};
