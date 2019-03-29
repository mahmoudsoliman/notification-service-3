/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NotificationType', {
    NotificationTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NotificationTypeName: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'notificationtypes'
  },{
    timestamps: false
  });
};
