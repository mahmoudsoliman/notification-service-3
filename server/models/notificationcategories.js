/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NotificationCategory', {
    NotificationCategoryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NotificationCategoryName: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'notificationcategories'
  },{
    timestamps: false
  });
};
