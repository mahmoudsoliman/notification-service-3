/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NotificationStatus', {
    NotificationStatusId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NotificationStatusName: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'notificationstatus'
  },{
    timestamps: false
  });
};
