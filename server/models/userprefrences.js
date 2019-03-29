/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserPrefrence', {
    UserPreferenceId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    NotificationCategoryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'notificationcategories',
        key: 'notificationcategoryid'
      }
    },
    PreferredNotificationTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'notificationtypes',
        key: 'notificationtypeid'
      }
    },
    IsDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'userprefrences'
  },{
    timestamps: false
  });
};
