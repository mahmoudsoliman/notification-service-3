/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notification', {
    NotificationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    NotificationType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Recipient: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    NotificationBody: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    SendDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    StatusId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'notificationstatus',
        key: 'notificationstatusid'
      }
    }
  }, {
    tableName: 'notifications'
  },{
    timestamps: false
  });
};
