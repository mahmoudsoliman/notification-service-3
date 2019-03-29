/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Language', {
    LanguageId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    LanguageName: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'languages'
  },{
    timestamps: false
  });
};
