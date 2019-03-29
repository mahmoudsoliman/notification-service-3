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
    LanguageId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'languages',
        key: 'languageid'
      }
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
