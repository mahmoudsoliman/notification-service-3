/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NotificationTemplate', {
    NotificationTemplateId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    NotificationTemplateKey: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    Template: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    tableName: 'notificationtemplates'
  },{
    timestamps: false
  });
};
